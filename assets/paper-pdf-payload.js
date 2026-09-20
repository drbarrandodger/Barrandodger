window.BD_PAPER_PDF_NAME="collective-targeting-phenomenon-academic-paper.pdf";
window.BD_PAPER_PDF_B64="PLACEHOLDER";
function bdDownloadPaperPdf(){
  try {
    if(!window.BD_PAPER_PDF_B64||window.BD_PAPER_PDF_B64==="PLACEHOLDER"){
      window.print();
      if(window.BD_DL&&BD_DL.bump) BD_DL.bump("paper-collective-targeting-pdf");
      return;
    }
    var bin=atob(window.BD_PAPER_PDF_B64);
    var arr=new Uint8Array(bin.length);
    for(var i=0;i<bin.length;i++) arr[i]=bin.charCodeAt(i);
    var blob=new Blob([arr],{type:"application/pdf"});
    var a=document.createElement("a");
    a.href=URL.createObjectURL(blob);
    a.download=window.BD_PAPER_PDF_NAME;
    document.body.appendChild(a); a.click(); a.remove();
    if(window.BD_DL&&BD_DL.bump) BD_DL.bump("paper-collective-targeting-pdf");
  } catch(e) { window.print(); }
}
