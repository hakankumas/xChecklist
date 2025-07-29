const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

exports.generatePDF = async (domain, questions, fileName) => {
    const doc = new PDFDocument({
        size: "A4",
        margins: { top: 30, bottom: 30, left: 30, right: 30 },
    });

    const outputDir = path.join(__dirname, "../public/pdf");

    // Klasör yoksa oluştur
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, fileName);
    doc.pipe(fs.createWriteStream(outputPath));

    // Türkçe karakter destekli font (TTF)
    const fontPath = path.join(
        __dirname,
        "../public/fonts",
        "Roboto-Regular.ttf"
    );
    doc.registerFont("Turkish", fontPath);

    const pageWidth =
        doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const startX = doc.page.margins.left;
    let cursorY = doc.page.margins.top;

    // Başlık ve Domain
    doc.fontSize(20)
        .font("Turkish")
        .text("Ön Analiz Raporu", startX, cursorY, {
            width: pageWidth / 2,
            align: "left",
        });

    doc.fontSize(20)
        .font("Turkish")
        .text(domain, startX + pageWidth / 2, cursorY, {
            width: pageWidth / 2,
            align: "right",
        });

    cursorY += 30;
    doc.moveTo(startX, cursorY)
        .lineTo(startX + pageWidth, cursorY)
        .stroke();
    cursorY += 10;

    function drawCardBorder(x, y, width, height) {
        doc.lineWidth(1).strokeColor("#dee2e6");
        doc.rect(x, y, width, height).stroke();
    }

    const cardWidth = pageWidth;
    const cardPadding = 10;
    const questionFontSize = 14;
    const answerFontSize = 12;
    const cardSpacing = 15;

    for (let i = 0; i < questions.length; i++) {
        const qa = questions[i];

        const questionHeight = doc.heightOfString(qa.question_name, {
            width: cardWidth - 2 * cardPadding,
            font: "Turkish",
            size: questionFontSize,
        });

        const answerHeight = doc.heightOfString(qa.selected, {
            width: cardWidth - 2 * cardPadding,
            font: "Turkish",
            size: answerFontSize,
        });

        const cardHeight = questionHeight + answerHeight + cardPadding * 3;

        if (cursorY + cardHeight > doc.page.height - doc.page.margins.bottom) {
            doc.addPage();
            cursorY = doc.page.margins.top;
        }

        drawCardBorder(startX, cursorY, cardWidth, cardHeight);

        let textX = startX + cardPadding;
        let textY = cursorY + cardPadding;

        doc.fontSize(questionFontSize)
            .font("Turkish")
            .fillColor("black")
            .text(qa.question_name, textX, textY, {
                width: cardWidth - 2 * cardPadding,
                align: "left",
            });

        textY += questionHeight + 5;

        doc.fontSize(answerFontSize)
            .font("Turkish")
            .fillColor("black")
            .text(qa.selected, textX, textY, {
                width: cardWidth - 2 * cardPadding,
                align: "left",
            });

        cursorY += cardHeight + cardSpacing;
    }

    doc.end();
};
