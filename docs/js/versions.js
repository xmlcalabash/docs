(function() {
  const ghPages = "https://api.github.com/repos/xmlcalabash/docs/contents/docs/userguide?ref=gh-pages"

  const gver = document.querySelector("#guideversion");
  const rver = document.querySelector("#refversion");
  const aver = document.querySelector("#apiversion");
  const error = document.querySelector(".error");

  const showError = function(message) {
    error.innerHTML = "« " + message + " »"
  };

  const gotoPage = function(event) {
    window.location = event.target.value;
  }

  const selections = function(elem, path, versions) {
    const select = document.createElement("select");
    select.onchange = gotoPage;
    for (item of versions) {
      const option = document.createElement("option");
      option.setAttribute("value", `/${path}/${item.name}/`);
      option.innerHTML = `Version ${item.name}`;
      select.appendChild(option);
    }
    elem.innerHTML = "";
    elem.appendChild(select);
  }

  const showVersions = function(json) {
    let versions = []
    if (!Array.isArray(json)) {
      showError("Version history format unexpected");
      return;
    }

    // Assume GitHub has put them in appropriate lexicographic order...
    for (item of json) {
      if (item.type === "dir" && item.name !== "current") {
        versions.unshift(item);
      }
    }

    if (versions.length === 0) {
      showError("Version history is empty");
      return;
    }

    selections(gver, "userguide", versions);
    selections(rver, "reference", versions);
    selections(aver, "apidocs", versions);
  };

  fetch(ghPages)
    .then(response => {
      if (response.ok) {
        response.json().then(json => {
          showVersions(json)
        })
        .catch(err => {
          showError("Failed to update version lists");
          console.log(err);
        });
      } else {
        showError("Failed to read version history from repository");
        console.log(response)
      }
    })
    .catch(err => {
      showError("Failed to parse version history from repository");
      console.log(err)
    });
})();
