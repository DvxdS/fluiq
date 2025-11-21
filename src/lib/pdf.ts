import jsPDF from 'jspdf';
import { PitchData } from '@/types';

export const generatePitchDeck = (data: PitchData): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header
  doc.setFillColor(249, 115, 22); // orange-500
  doc.rect(0, 0, pageWidth, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text(data.name, pageWidth / 2, 25, { align: 'center' });

  // Subheader
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`@${data.handle} • ${data.niche}`, pageWidth / 2, 35, { align: 'center' });

  // Reset colors
  doc.setTextColor(0, 0, 0);
  let y = 55;

  // Bio section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('A propos', 20, y);
  y += 8;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const bioLines = doc.splitTextToSize(data.bio, pageWidth - 40);
  doc.text(bioLines, 20, y);
  y += bioLines.length * 6 + 10;

  // Stats section
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(20, y, pageWidth - 40, 35, 3, 3, 'F');

  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('ABONNES', 40, y + 12, { align: 'center' });
  doc.text('ENGAGEMENT', pageWidth / 2, y + 12, { align: 'center' });
  doc.text('LOCALISATION', pageWidth - 40, y + 12, { align: 'center' });

  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.setFont('helvetica', 'bold');
  doc.text(formatNumber(data.followers), 40, y + 26, { align: 'center' });
  doc.text(`${data.engagement}%`, pageWidth / 2, y + 26, { align: 'center' });
  doc.text(data.location, pageWidth - 40, y + 26, { align: 'center' });

  y += 50;

  // Platforms
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Plateformes', 20, y);
  y += 10;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(data.platforms.join(' • '), 20, y);
  y += 20;

  // Contact
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Contact', 20, y);
  y += 10;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text(data.email, 20, y);

  // Footer
  doc.setFillColor(139, 92, 246); // violet-500
  doc.rect(0, 277, pageWidth, 20, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text('Cree avec Fluiq - fluiq.app', pageWidth / 2, 288, { align: 'center' });

  // Download
  const fileName = `pitch-deck-${data.name.toLowerCase().replace(/\s+/g, '-')}.pdf`;
  doc.save(fileName);
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};
