const url = document.querySelector('#url');
const timestampInput = document.querySelector('#timestamp');
const notesForm = document.querySelector('#notesForm');

const code = `(function getTimeStamp(){
    return document.querySelector('span.ytp-time-current').innerText
  })()`;

document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    function (tabs) {
      url.value = tabs[0].url;
    }
  );

  chrome.tabs.executeScript(
    null,
    {
      code,
    },
    (results) => {
      timestampInput.value = results[0];
    }
  );
});

notesForm.onsubmit = (e) => {
  e.preventDefault();
  axios
    .post('http://localhost:3001/api/notes', {
      url: e.target.url.value,
      timestamp: e.target.timestamp.value,
      note: e.target.note.value,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  // const response = await fetch('http://localhost:3001/api/notes', {
  //   method: 'POST',
  //   body: {
  //     url: e.target.url.value,
  //     timestamp: e.target.timestamp.value,
  //     note: e.target.note.value,
  //   },
  // });

  // try {
  //   const result = await response.json();
  //   console.log(result);
  // } catch (error) {
  //   console.log(error);
  // }
};
