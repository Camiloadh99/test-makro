/* eslint-disable no-undef */

let xlsxFile = null;

const $ = (el) => document.querySelector(el);

const SPECIAL_BRIEF = 'special';
const WEEKELY_BRIEF = 'weekely';

const $loader = $('.loader-container');
const $errorAlert = $('#error-alert');
const $buttonContainer = $('.button-container');
//buttons
const $uploadNewFileButton = $('#uploadNewFileButton');
const $sendFileButton = $('#sendFileButton');
const $sendSpecialButton = $('#sendSpecialButton');
const $clearFilesButton = $('#clearFilesButton');

window.Dropzone.options.dropzoneBasic = {
  acceptedFiles: '.xlsx',
  maxFiles: 1,
  init: function () {
    this.on('addedfile', function () {
      if (this.files.length > 1) {
        this.removeFile(this.files[0]);
      }
    });
    this.on('uploadprogress', function () {
      $loader.style.display = 'flex';
    });
    this.on('complete', function () {
      $loader.style.display = 'none';
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

  $sendFileButton.disabled = false;
  $sendSpecialButton.disabled = false;
  $buttonContainer.classList.add('show');
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

const handleSendFile = async (type) => {
  try {
    $loader.style.display = 'flex';

    //**Evitar hacer mas llamados */
    $sendFileButton.disabled = true;
    $sendSpecialButton.disabled = true;

    let isSpecialBrief = 'specia_brief';
    if (type === WEEKELY_BRIEF) {
      isSpecialBrief = 'weekly_brief';
    }

    const host = window.location.origin;
    const url = `${host}/api/v1/file-sheets/process?doc_type=${isSpecialBrief}`;

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

      $sendFileButton.disabled = true;
      $sendSpecialButton.disabled = true;
      $buttonContainer.classList.remove('show');

      if (data?.metadata?.errors) {
        const errorMessages = data.metadata.errors.join('. ');
        showErrorAlert(`${data.message}: ${errorMessages}`);
      } else {
        showErrorAlert(`${data.message}`);
      }
    }
    $loader.style.display = 'none';
  } catch (error) {
    console.log(error);
  }
};

//**Buttons */
$uploadNewFileButton.addEventListener('click', () => {
  dropzone.removeAllFiles(true);
  xlsxFile = null;

  $sendFileButton.disabled = true;
  $sendSpecialButton.disabled = true;
  $buttonContainer.classList.remove('show');

  //Change section
  showSections({
    sectionShow: '.upload-section',
    sectionHidde: '.success-section'
  });
});

$sendFileButton.addEventListener('click', () => handleSendFile(WEEKELY_BRIEF));
$sendSpecialButton.addEventListener('click', () => handleSendFile(SPECIAL_BRIEF));

$clearFilesButton.addEventListener('click', () => {
  dropzone.removeAllFiles(true);
  xlsxFile = null;
  $sendFileButton.disabled = true;
  $sendSpecialButton.disabled = true;
  $buttonContainer.classList.remove('show');
});

//**Alert */
function showErrorAlert(message) {
  $errorAlert.textContent = message;
  $errorAlert.style.display = 'block';
}

function hideErrorAlert() {
  $errorAlert.style.display = 'none';
}
