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
  hideErrorAlert();
  self.emit('success', file, 'success', null);

  self.emit('complete', file);
  self.processQueue();
};

const dropzone = new Dropzone('#dropzone-basic', { url: '/file/post' });

const showSections = ({ sectionShow, sectionHidde }) => {
  document.querySelector(sectionHidde).style.display = 'none';
  document.querySelector(sectionShow).style.display = 'block';
};

const handleSendFile = async () => {
  try {
    document.querySelector('.loader-container').style.display = 'flex';
    const host = window.location.origin;
    const url = `${host}/api/v1/file-sheets/process`;

    const formDataBody = new FormData();
    formDataBody.append('file', xlsxFile);

    const response = await fetch(url, {
      method: 'POST',
      body: formDataBody
    });

    if (response.status === 200) {
      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlBlob;
      a.download = 'response.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(urlBlob);

      showSections({
        sectionShow: '.success-section',
        sectionHidde: '.upload-section'
      });
    } else {
      const data = await response.json();
      dropzone.removeAllFiles(true);
      xlsxFile = null;
      document.getElementById('sendFileButton').disabled = true;
      document.querySelector('.button-container').classList.remove('show');

      if (data?.metadata?.errors) {
        const errorMessages = data.metadata.errors.join('. ');
        showErrorAlert(`${data.message}: ${errorMessages}`);
      } else {
        showErrorAlert(`${data.message}`);
      }
    }
    document.querySelector('.loader-container').style.display = 'none';
  } catch (error) {
    console.log(error);
  }
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

//**Alert */
function showErrorAlert(message) {
  const errorAlert = document.getElementById('error-alert');
  errorAlert.textContent = message;
  errorAlert.style.display = 'block';
}

function hideErrorAlert() {
  document.getElementById('error-alert').style.display = 'none';
}
