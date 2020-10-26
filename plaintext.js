function formatGeneralPlaintextHeader(resume, colWidth) {
  let resumeHeader
      = "CONTACT INFO\n============\n"
      + `Name: ${resume.name}\n`
      + `GitHub: https://www.github.com/${resume.github}\n`
      + `LinkedIn: https://www.linkedin.com/in/${resume.linkedIn}\n`
      + `Email: ${resume.email}\n`
      + `Phone: ${resume.phone}\n\n`
      + `EDUCATION\n=========\n`;
  for(let university of resume.education) {
    resumeHeader += `${university.uni_name}\n`;
    for(let school of university.schools) {
      for(let degree of school.degrees) {
        var degreeStr = `${degree.level} in ${degree.concentration}`;
        var yearStr = `Anticipated`;
        if(degree.awarded) {
          yearStr = `Awarded`;
        }
        yearStr += " " + degree.end_month + " " + degree.end_year;
        var innerGap = colWidth - yearStr.length - degreeStr.length;
        resumeHeader += degreeStr + " ".repeat(innerGap) + yearStr + '\n';
      }
    }
  }
  return resumeHeader;
}

function formatJob(job, colWidth) {
  var companyTitleInnerGap = colWidth - job.company.length - job.location.length;
  let formattedJob = job.company + " ".repeat(companyTitleInnerGap) + job.location + '\n';
  for(let position of job.positions) {
    var titleStr = `${position.title}`;
    var startDate = new Date(position.start_date).toLocaleString('default', {month: 'short', year: 'numeric'});
    var endDate;
    if(position.end_date) {
      endDate = new Date(position.end_date).toLocaleString('default', {month: 'short', year: 'numeric'});
    } else {
      endDate = "Present";
    }
    var tenure_str = `${startDate} - ${endDate}`;
    var innerGap = colWidth - tenure_str.length - titleStr.length;
    formattedJob += titleStr + " ".repeat(innerGap) + tenure_str + '\n';
    for(let note of position.notes) {
      var noteBullet = " - ";
      note = noteBullet + note;
      formattedJob += breakIntoLinesOnCol(note, noteBullet.length, colWidth);
    }
    formattedJob += '\n';
  }
  return formattedJob;
}


function formatProject(project, colWidth) {
  let formattedProject = project.title + ` (${project.languages})\n`;
  let noteWidth = colWidth - 3;
  for(let note of project.comments) {
    var noteBullet = " - ";
    note = noteBullet + note;
    // Return first occurrence of space before column 80
    if(note.length > noteWidth) {
      formattedProject += breakIntoLinesOnCol(note, noteBullet.length, colWidth);
    } else {
      formattedProject += " - " + note + '\n';
    }
  }
  return formattedProject + '\n';
}


function formatPaper(entry, paper, colWidth) {
  let finalString = "";

  let formattedCitationNumber = `[${entry}] `;
  let citationNumberWidth = formattedCitationNumber.length;

  let formattedPaper = formattedCitationNumber
      + paper.authors.join(', ')
      + ", " + paper.title
      + ", " + paper.journal
      + '\n';

  if(formattedPaper.length > colWidth - citationNumberWidth) {
    finalString += breakIntoLinesOnCol(formattedPaper, citationNumberWidth, colWidth);
  } else {
    finalString += formattedPaper;
  }
  return finalString;
}

function formatPlaintextResume(resume, specialization = "", colWidth = 80) {
  // I'm assuming everyone wants their contact information and education for now
  let plaintext_resume = formatGeneralPlaintextHeader(resume, colWidth);
  plaintext_resume += "\nEXPERIENCE\n==========\n";
  for(let job of resume.jobs) {
    plaintext_resume += formatJob(job, colWidth);
  }
  plaintext_resume += "PROJECTS\n========\n";
  for(let project of resume.projects) {
    if(project.include) {
      plaintext_resume += formatProject(project, colWidth);
    }
  }
  plaintext_resume += "PUBLICATIONS\n============\n";
  let i = 1;
  for(let paper of resume.publications) {
    plaintext_resume += formatPaper(i, paper, colWidth);
    ++i;
  }
  return plaintext_resume;
}

function breakIntoLinesOnCol(inputStr, lineOffset, colWidth) {
  var finalString = "";
  // We will insert spaces on the left to fill out to colWidth
  var realLineWidth = colWidth - lineOffset;
  // The space we break the string on carries over to the next line,
  // so the "real offset" is 1 less space than expected
  var realOffsetWidth = lineOffset - 1;

  // TODO: Move to do-while loop
  var firstLineBreak;
  if(inputStr[colWidth] === " " || inputStr.length <= colWidth) {
    firstLineBreak = colWidth;
  } else {
    firstLineBreak = inputStr.lastIndexOf(" ", colWidth);
  }
  finalString += inputStr.slice(0, firstLineBreak) + '\n';
  var nextSpace = 0;
  for(let currentSpace = firstLineBreak;
      currentSpace <= inputStr.length;
      currentSpace += realLineWidth)
  {
    nextSpace = inputStr.lastIndexOf(" ", currentSpace + realLineWidth);
    currentSpace = inputStr.lastIndexOf(" ", currentSpace);
    finalString += " ".repeat(realOffsetWidth) + inputStr.slice(currentSpace, nextSpace);
    if(currentSpace + realLineWidth > inputStr.length) {
      finalString += inputStr.slice(inputStr.lastIndexOf(" ", inputStr.length),inputStr.length) + '\n';
    } else {
      finalString += '\n';
    }
  }
  return finalString;
}

module.exports = {
  formatGeneralPlaintextHeader
  , formatJob
  , formatProject
  , formatPaper
  , formatPlaintextResume
};
