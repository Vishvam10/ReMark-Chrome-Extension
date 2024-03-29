// var BACKEND_URL = "https://data-science-theta.vercel.app/api";
var BACKEND_URL = "http://localhost:3000/api";

chrome.runtime.onConnect.addListener(function (port) {
  console.log("Connected to injected script:", port);
  // Listen for data from the injected script
  port.onMessage.addListener(async function (message) {
    const data = message.data;
    console.log("Received data from injected script:", data);
    if ("action" in data && data.action == "pushToServer") {
      console.log("in bg : data : ", data);
      try {
        const url = `${BACKEND_URL}/submit`;
        const email = data.email;

        const imgFile = dataURItoFile(data.screenshotDataURI, "screenshot.png");

        const labelBlob = new Blob([data.labels], { type: "text/plain" });
        const labelFile = new File([labelBlob], "labels.txt", {
          type: "text/plain",
        });

        console.log("imgFile : ", imgFile);
        console.log("imgFile size : ", convertFileSize(imgFile.size));
        console.log("labelFile : ", labelFile);

        var myHeaders = new Headers();
        myHeaders.append("email", String(email));

        var formdata = new FormData();
        formdata.append("label", labelFile);
        formdata.append("image", imgFile);
        logFormData(formdata);

        const requestOptions = {
          method: "POST",
          mode: "cors",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
        };

        let res = await fetch(url, requestOptions);
        res = await res.text();

        console.log("res : ", res, typeof res, res.includes("Submitted"));

        if (res && res.includes("Submitted")) {
          console.log("SUCCESSFUL SUBMISSION !");
          port.postMessage({ result: "screenshotSuccess" });
        } else {
          console.log("FAILED : ", res);
          port.postMessage({ result: "screenshotFailed" });
        }
      } catch (e) {
        sendResponse({
          error: e.message,
        });
      }
    }
  });
});

function logFormData(formData) {
  for (let e of Array.from(formData)) {
    console.log(e[0], " : ", e[1]);
  }
}

function downloadFile(dataURI, fileName) {
  const downloadLink = document.createElement("a");
  downloadLink.href = dataURI;
  downloadLink.download = fileName;
  downloadLink.click();
  downloadLink.remove();
}

function dataURIToBlob(dataURI) {
  const splitDataURI = dataURI.split(",");
  const byteString =
    splitDataURI[0].indexOf("base64") >= 0
      ? atob(splitDataURI[1])
      : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

  return new Blob([ia], { type: mimeString });
}

function dataURItoFile(dataurl, filename) {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

function convertFileSize(bytes, si=false, dp=1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si 
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10**dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


  return bytes.toFixed(dp) + ' ' + units[u];
}