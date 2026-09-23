/* Source originals for tab pages. Does not rewrite evidence. */
(function(){
  var box=document.getElementById('sourced-originals');
  if(!box){
    box=document.createElement('div');
    box.id='sourced-originals';
    box.className='notice';
    document.body.appendChild(box);
  }
  box.innerHTML='<p><strong>Sourced originals.</strong> Full text is in the PDFs. Not a court.</p><p><a href="https://github.com/drbarrandodger/barran-dodger-archive">drbarrandodger/barran-dodger-archive</a> · <a href="https://github.com/wezzo72/Backup">wezzo72/Backup</a> · <a href="https://github.com/wezzo72/Barrandodger">wezzo72/Barrandodger</a></p><p><a href="/Barrandodger/tabs/pids.html">PIDs standalone page</a> · <a href="/Barrandodger/drive-official-binaries.html">Official Drive binaries</a></p>';
})();
