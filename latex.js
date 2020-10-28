function printFullWidthComment(colWidth) {
  return "%" + "-".repeat(colWidth-1);
}

function writePreamble(paperSize, textSize, exporter, font) {
  // TODO: Decide whether we should be the ones checking if LaTeX parameters are
  // correct, or if we should let LaTeX do it
  let formattedHeader = "";
  if(exporter !== "pdflatex") {
    // TODO: Write an imperative to compile with xelatex, etc
  }
  //formattedHeader += formatLicense(2013, "Sourabh Bajaj", "MIT");
  formattedHeader +=
    "\\documentclass[" + paperSize + ',' + textSize + 'pt]{article}\n'
    + "\\usepackage{latexsym}\n"
    + "\\usepackage[empty]{fullpage}\n"
    + "\\usepackage{titlesec}\n"
    + "\\usepackage{marvosym}\n"
    + "\\usepackage[usenames,dvipsnames]{color}\n"
    + "\\usepackage{verbatim}\n"
    + "\\usepackage{enumitem}\n"
    + "\\usepackage[hidelinks]{hyperref}\n"
    + "\\usepackage{fancyhdr}\n"
    + "\\usepackage[english]{babel}\n"
    + "\\usepackage{multicol}\n"
    + "\\usepackage{graphicx}\n";

  if(font) {
    formattedHeader +=
      "\\usepackage{fontspec}\n"
      + `\\setmainfont${font}\n`;
  }
  formattedHeader +=
    "\\pagestyle{fancy}\n"
    + "\\fancyhf{}\n"
    + "\\fancyfoot{}\n"
    + "\\renewcommand{\\headrulewidth}{0pt}\n"
    + "\\renewcommand{\\footrulewidth}{0pt}\n"
    + "\\addtolength{\\oddsidemargin}{-0.5in}\n"
    + "\\addtolength{\\evensidemargin}{-0.5in}\n"
    + "\\addtolength{\\textwidth}{1in}\n"
    + "\\addtolength{\\topmargin}{-0.5in}\n"
    + "\\addtolength{\\textheight}{1.0in}\n"
    + "\\urlstyle{same}\n"
    + "\\raggedbottom\n"
    + "\\raggedright\n"
    + "\\setlength{\\tabcolsep}{0in}\n"
    + "\\titleformat{\\section}{\n"
    + "  \\vspace{-4pt}\\scshape\\raggedright\\large"
    + "}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]\n"
    + "\\newcommand{\\resumeItem}[2]{\\item\\small{\\textbf{#1}{: #2 \\vspace{-2pt}}}}\n"
    + "\\newcommand{\\resumeBullet}[1]{\n\\item\\small{{#1 \\vspace{-2pt}}}}\n"
    + "\\newcommand{\\resumeSubheading}[4]{\n"
    + "  \\vspace{-1pt}\\item\n"
    + "  \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}\n"
    + "    \\textbf{#1} & #2 \\\\\n"
    + "    \\textit{\\small#3} \& \\textit{\\small #4} \\\\\n"
    + "  \\end{tabular*}\\vspace{-5pt}\n}\n"
    + "\\newcommand{\\resumeSubItem}[2]{\\resumeItem{#1}{#2}\\vspace{-4pt}}\n"
    + "\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=*]}\n"
    + "\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}\n"
    + "\\newcommand{\\resumeItemListStart}{\\begin{itemize}}\n"
    + "\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}\n"
    + "% Below two lines from https://tex.stackexchange.com/a/52517" + "\n"
    + "\\newcommand{\\plus}{\\raisebox{.4\height}{\scalebox{.6}{+}}}\n"
    + "\\newcommand{\\minus}{\\raisebox{.4\height}{\scalebox{.8}{-}}}\n"
    + "% Next line from https://tex.stackexchange.com/a/43742" + "\n"
    + "\\makeatletter\n"
    + "  \\let\\@noitemerr\\relax\n"
    + "\\makeatother\n"
    + "\\begin{document}\n";
  return formattedHeader;
}

function writeContactInfo(resume) {
  let contactInfo =
      "\\begin{tabular*}{\\textwidth}{l@{\\extracolsep{\\fill}}r}\n"
      + `  \\textbf{\\href{${resume.website}}{\\Large ${resume.name}}} \& \\\\\n`
      + `  \\href{http://www.github.com/${resume.github}}{http://www.github.com/${resume.github}} \&\n`
      + `  Email : \\href{mailto:${resume.email}}{${resume.email}} \\\\\n`
      + `  \\href{https://www.linkedin.com/in/${resume.linkedIn}}{https://www.linkedin.com/in/${resume.linkedIn}} \&\n`
      + `  Mobile : ${resume.phone} \\\\\n`
  + "\\end{tabular*}\n";
  return contactInfo;
}

function writeEducationInfo(resume) {
  let educationInfo =
      "\\section{Education}\n"
      + "\\resumeSubHeadingListStart\n";
  for(let university of resume.education) {
    // write the degrees
  }
  educationInfo += "\\resumeSubHeadingListEnd\n";
  return educationInfo;
}

function writeExperience(resume) {
  let jobInfo =
      "\\section{Experience}\n"
      + "\\resumeSubHeadingListStart\n";
  for(let job of resume.jobs) {
    // write the jobs
  }
  jobInfo += "\\resumeSubHeadingListEnd\n";
  return jobInfo;
}

function writeJobInfo(resume) {
}

function writeSection(header) {
  return `\\section{${header}}\n`;
}

function writeProjects(resume) {
  let projectInfo =
      "\\section{Representative Projects}\n"
      + "  \\resumeSubHeadingListStart\n";
  for(let project of resume.projects) {
    projectInfo +=
      " ".repeat(4) + `\\resumeSubItem{${project.title}}{}\n`
      + " ".repeat(6) + "\\begin{itemize}\n";
    if(project.comments) {
    for(let comment of project.comments) {
      projectInfo += " ".repeat(8) + `\\item{${comment}}\n`;
    }
    }
    projectInfo += " ".repeat(6) + "\\end{itemize}\n";
    //write each project
  }
  projectInfo += "  \\resumeSubHeadingListEnd\n";
  return projectInfo;
}

function writeSkills(resume) {

}

function writePublications(resume) {
  let publicationInfo =
      "\\section{Publications}\n"
      + "\\resumeSubHeadingListStart\n";
  for(let paper in resume.publications) {
    // write the publications
  }
  publicationInfo += "\\resumeSubHeadingListEnd\n";
  return publicationInfo;
}

function formatTex(resume, paperSize="letterpaper", textSize="11", exporter="pdflatex", font=null) {
  let formattedTex = "";
  // TODO: Iterate over a list of sections to write them in that order
  formattedTex += writePreamble(paperSize, textSize, exporter, font);
  formattedTex += writeContactInfo(resume);
  formattedTex += writeEducationInfo(resume);
  formattedTex += writeExperience(resume);
  formattedTex += writeProjects(resume);
  formattedTex += "\\end{document}\n";
  return formattedTex;
}

module.exports = {
  writePreamble
  , writeContactInfo
  , formatTex
}
