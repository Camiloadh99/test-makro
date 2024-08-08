/* eslint-disable comma-dangle */
/* eslint-disable no-undef */

let xlsxFile = null;

window.Dropzone.options.dropzoneBasic = {
  acceptedFiles: '.xlsx',
  maxFiles: 1,
  init: function () {
    this.on('addedfile', function (file) {
      if (this.files.length > 1) {
        this.removeFile(this.files[0]);
      }
    });
    this.on('uploadprogress', function (file, progress) {
      document.querySelector('.loader-container').style.display = 'flex';
    });
    this.on('complete', function (file) {
      document.querySelector('.loader-container').style.display = 'none';
    });
  }
};

window.Dropzone.prototype.uploadFiles = function (files) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const self = this;

  const file = files[0];

  file.status = Dropzone.SUCCESS;
  //Save the file and enable the button
  xlsxFile = file;
  document.getElementById('sendFileButton').disabled = false;
  document.querySelector('.button-container').classList.add('show');
  self.emit('success', file, 'success', null);

  self.emit('complete', file);
  self.processQueue();
};

//Install npm i dropzone
const dropzone = new Dropzone('#dropzone-basic', { url: '/file/post' });

const showSections = ({ sectionShow, sectionHidde }) => {
  document.querySelector(sectionHidde).style.display = 'none';
  document.querySelector(sectionShow).style.display = 'block';
};

const handleSendFile = () => {
  document.querySelector('.loader-container').style.display = 'flex';

  setTimeout(() => {
    console.log(xlsxFile);
    document.querySelector('.loader-container').style.display = 'none';
    showSections({
      sectionShow: '.success-section',
      sectionHidde: '.upload-section'
    });
  }, 1000);
};

//**Buttons */

//Send file button
document.getElementById('sendFileButton').addEventListener('click', handleSendFile);

//Clear files button
document.getElementById('clearFilesButton').addEventListener('click', () => {
  dropzone.removeAllFiles(true);
  xlsxFile = null;
  document.getElementById('sendFileButton').disabled = true;
  document.querySelector('.button-container').classList.remove('show');
});

//Upload new file button
document.getElementById('uploadNewFileButton').addEventListener('click', () => {
  dropzone.removeAllFiles(true);
  xlsxFile = null;
  document.getElementById('sendFileButton').disabled = true;
  document.querySelector('.button-container').classList.remove('show');

  //Change section
  showSections({
    sectionShow: '.upload-section',
    sectionHidde: '.success-section'
  });
});

//dowload new file button
document.getElementById('downloadFileButton').addEventListener('click', () => {
  console.log('download');
});
