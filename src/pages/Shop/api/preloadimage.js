export default {
  preLoad(url, onSuccess, onerror) {
    var img = new Image();
    img.src = url;
    img.onload = function () {
      if (typeof onSuccess == "function") {
        onSuccess(img);
      }
    }
    img.onerror = function () {
      console.log('error')
      if (typeof onerror == "function") {
        onerror();
      }
    }
  }
}
