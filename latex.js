function printFullWidthComment(colWidth) {
  return "%" + "-".repeat(colWidth-1);
}

function writeHeader(paperSize, textSize, exporter, font) {
  // TODO: Decide whether we should be the ones checking if LaTeX parameters are
  // correct, or if we should let LaTeX do it
  let formattedHeader = "";
  if(exporter !== "pdflatex") {
    // TODO: Write an imperative to compile with xelatex, etc
  }
  formattedHeader += "\\documentclass[" + paperSize + ',' + textSize + 'pt]{article}\n';
  return formattedHeader;
}

function formatTex(resume, paperSize="letterpaper", textSize="11", exporter="pdflatex", font=null) {
  return writeHeader(paperSize, textSize, exporter, font);
}

module.exports = {
  writeHeader
  , formatTex
}
