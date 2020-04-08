const url = document.querySelector('#url');
const timestampInput = document.querySelector('#timestamp');

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
