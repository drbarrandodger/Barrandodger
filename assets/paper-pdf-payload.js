window.BD_PAPER_PDF_NAME="institutional-mobbing-convergent-scapegoating-phd-working-paper.pdf";
function bdDownloadPaperPdf(){
  Promise.all([
    fetch("papers/pdf-b64-0.txt").then(function(r){return r.text();}),
    fetch("papers/pdf-b64-1.txt").then(function(r){return r.text();})
  ]).then(function(parts){
    var b64=(parts[0]+parts[1]).replace(/\s+/g,"");
    var bin=atob(b64);
    var arr=new Uint8Array(bin.length);
    for(var i=0;i<bin.length;i++) arr[i]=bin.charCodeAt(i);
    var blob=new Blob([arr],{type:"application/pdf"});
    var a=document.createElement("a");
    a.href=URL.createObjectURL(blob);
    a.download=window.BD_PAPER_PDF_NAME;
    document.body.appendChild(a); a.click(); a.remove();
    if(window.BD_DL&&BD_DL.bump) BD_DL.bump("paper-collective-targeting-pdf");
  }).catch(function(e){
    console.error(e);
    window.print();
    if(window.BD_DL&&BD_DL.bump) BD_DL.bump("paper-collective-targeting-pdf");
  });
}
