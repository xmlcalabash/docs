(function() {
  const gver = document.querySelector("#guideversion");
  const rver = document.querySelector("#refversion");
  const aver = document.querySelector("#apiversion");

  fetch("https://docs.xmlcalabash.com/userguide/current/details.json")
    .then(response => {
      if (response.ok) {
        response.json().then(json => {
          gver.innerHTML = `<a href="/userguide/${json.version}/">Version ${json.version}</a>`
        })
      }
    });

  fetch("https://docs.xmlcalabash.com/reference/current/details.json")
    .then(response => {
      if (response.ok) {
        response.json().then(json => {
          rver.innerHTML = `<a href="/reference/${json.version}/">Version ${json.version}</a>`
        })
      }
    });

  fetch("https://docs.xmlcalabash.com/apidocs/current/details.json")
    .then(response => {
      if (response.ok) {
        response.json().then(json => {
          aver.innerHTML = `<a href="/apidocs/${json.version}/">Version ${json.version}</a>`
        })
      }
    });
})();
