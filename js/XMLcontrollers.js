window.onload = function() {
  makeQuery("../lista.xml", "firstbox", "titles");
  //utworzZapytanie("kategorie.xml", "listakategorie", "nazwa");
}

function makeQuery (url, div, title) {
  var query = "";

  query = new XMLHttpRequest();

  query.onreadystatechange = function() {
    // if status is ok
    if (query.readyState == 4 && query.status == 200) {

      var documentXml = query.responseXML;
      var content = "<ul>";
      // take from XML tag name
      var titles = documentXml.getElementsByTagName(title);

      // loop for everysingle factor
      for (var i = 0; i < titles.length; i++) {
          content += "<li>" + titles[i].childNodes[0].nodeValue;
      }

       document.getElementById(div).innerHTML = content + "</ul>";

    } else {
      //otherwise display status in div
      document.getElementById(div).innerHTML = query.status;
    }
  }

  query.open("GET", url, true);
  query.send();
}

window.onload = function() {
  makeQuery("przyklady.xml", "firstbox", "titles");
  //utworzZapytanie("kategorie.xml", "listakategorie", "nazwa");
}

function makeQuery (url, div, title) {
  var query = "";

  query = new XMLHttpRequest();

  query.onreadystatechange = function() {
    // if status is ok
    if (query.readyState == 4 && query.status == 200) {

      var documentXml = query.responseXML;
      var content = "<ul>";
      // take from XML tag name
      var titles = documentXml.getElementsByTagName(title);

      // loop for everysingle factor
      for (var i = 0; i < titles.length; i++) {
          content += "<li>" + titles[i].childNodes[0].nodeValue;
      }

       document.getElementById(div).innerHTML = content + "</ul>";

    } else {
      //otherwise display status in div
      document.getElementById(div).innerHTML = query.status;
    }
  }

  query.open("GET", url, true);
  query.send();
}

