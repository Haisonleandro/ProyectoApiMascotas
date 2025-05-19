import { PrismaClient } from '@prisma/client';
import PDFDocument from 'pdfkit';
import { createCanvas } from 'canvas';
import Chart from 'chart.js/auto';

const prisma = new PrismaClient();

// Constantes para la configuración del PDF
const PDF_CONFIG = {
  PAGE_SIZE: 'A4',
  MARGIN: 50,
  TABLE_TOP: 100,
  COLUMN_WIDTH: 75,
  CHART_SIZE: 150,
  CHART_SCALE: 100,
  FONT_SIZES: { TITLE: 20, SUBTITLE: 16, TABLE_HEADER: 10, TABLE_TEXT: 10 },
  COLORS: { AVAILABLE: '#36A2EB', ADOPTED: '#FF6384' },
};

// Clase para manejar la generación del reporte PDF
class PetReportGenerator {
  constructor() {
    this.doc = new PDFDocument({ size: PDF_CONFIG.PAGE_SIZE, margin: PDF_CONFIG.MARGIN });
  }

  // Configura los encabezados de respuesta para descargar el PDF
  setupResponse(res) {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=reporte-mascotas.pdf');
    this.doc.pipe(res);
  }

  // Genera la tabla de mascotas en el PDF
  generateTable(pets) {
    this.doc.fontSize(PDF_CONFIG.FONT_SIZES.TITLE).text('Reporte de Mascotas', { align: 'center' });
    this.doc.moveDown();

    const headers = ['ID', 'Nombre', 'Raza', 'Categoría', 'Género', 'Estado', 'Propietario'];
    this.doc.fontSize(PDF_CONFIG.FONT_SIZES.TABLE_HEADER).font('Helvetica-Bold');
    headers.forEach((header, i) => {
      this.doc.text(header, 50 + i * PDF_CONFIG.COLUMN_WIDTH, PDF_CONFIG.TABLE_TOP, {
        width: PDF_CONFIG.COLUMN_WIDTH,
        align: 'left',
      });
    });

    this.doc.font('Helvetica').fontSize(PDF_CONFIG.FONT_SIZES.TABLE_TEXT);
    pets.forEach((pet, index) => {
      const y = PDF_CONFIG.TABLE_TOP + 20 + index * 20;
      const rowData = [
        pet.id,
        pet.name,
        pet.race.name,
        pet.category.name,
        pet.gender.name,
        pet.estado,
        pet.user.fullname,
      ];
      rowData.forEach((data, i) => {
        this.doc.text(data, 50 + i * PDF_CONFIG.COLUMN_WIDTH, y, {
          width: PDF_CONFIG.COLUMN_WIDTH,
          align: 'left',
        });
      });
    });
  }

  // Genera la gráfica de dona en el PDF
  generateChart(stats) {
    this.doc.addPage();
    this.doc
      .fontSize(PDF_CONFIG.FONT_SIZES.SUBTITLE)
      .text('Estadísticas de Mascotas por Estado', { align: 'center' });
    this.doc.moveDown();

    const canvas = createCanvas(PDF_CONFIG.CHART_SIZE, PDF_CONFIG.CHART_SIZE);
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Disponible', 'Adoptado'],
        datasets: [
          {
            label: 'Cantidad de Mascotas',
            data: [stats.Disponible, stats.Adoptado],
            backgroundColor: [PDF_CONFIG.COLORS.AVAILABLE, PDF_CONFIG.COLORS.ADOPTED],
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
      },
    });

    const chartImage = canvas.toBuffer('image/png');
    this.doc.image(chartImage, 50, 150, {
      width: PDF_CONFIG.CHART_SCALE,
      height: PDF_CONFIG.CHART_SCALE,
    });
  }

  // Finaliza el documento
  finalize() {
    this.doc.end();
  }
}

// Obtiene los datos de las mascotas desde la base de datos
const fetchPetData = async () => {
  return prisma.pets.findMany({
    select: {
      id: true,
      name: true,
      estado: true,
      race: { select: { name: true } },
      category: { select: { name: true } },
      gender: { select: { name: true } },
      user: { select: { fullname: true } },
    },
  });
};

// Calcula las estadísticas de mascotas
const calculateStats = (pets) => ({
  Disponible: pets.filter((p) => p.estado === 'Disponible').length,
  Adoptado: pets.filter((p) => p.estado === 'Adoptado').length,
});

// Endpoint para obtener reportes en formato JSON
const getReportshltl = async (req, res) => {
  try {
    const pets = await fetchPetData();
    const stats = calculateStats(pets);
    res.json({ pets, stats });
  } catch (error) {
    console.error('Error al obtener reportes:', error);
    res.status(500).json({ error: 'Error al obtener reportes' });
  }
};

// Endpoint para generar y descargar el reporte en PDF
const downloadReporthltl = async (req, res) => {
  try {
    const pets = await prisma.pets.findMany({
      include: { race: true, category: true, gender: true, user: true },
    });
    const stats = calculateStats(pets);

    const report = new PetReportGenerator();
    report.setupResponse(res);
    report.generateTable(pets);
    report.generateChart(stats);
    report.finalize();
  } catch (error) {
    console.error('Error al generar reporte PDF:', error);
    res.status(500).json({ error: 'Error al generar reporte PDF' });
  }
};

export { getReportshltl, downloadReporthltl };