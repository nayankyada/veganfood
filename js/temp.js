let adsId = ["1365813"];
let ads = [];
function dateDifference(d1, d2) {
  var t2 = d2.getTime();
  var t1 = d1.getTime();
  return parseInt((t2 - t1) / (24 * 3600 * 1000));
}
let fetchAllAds = () => {
  new Promise((resolve, reject) => {
    for (let i = 0; i < adsId.length; i++) {
      let div = document.querySelectorAll(
        `[id*=M834201ScriptRootC${adsId[i]}]`
      )?.[0];
      let shadowedDiv = div?.shadowRoot;
      for (let j = 0; j < shadowedDiv.querySelectorAll("a").length; j++) {
        ads.push(shadowedDiv.querySelectorAll("a")[j]);
      }
    }
    resolve("done");
  }).then((d) => {
    localStorage.setItem("clickedDate", new Date().toDateString());
    let rnd = Math.floor(Math.random() * ads.length);
    ads[rnd].target = "_self";
    setTimeout(() => {
      // ads[rnd].click();
    }, 700);
  });
};
let randomTime = Math.floor(Math.random() * 8000);
let clickedDate = localStorage.getItem("clickedDate");

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (clickedDate) {
      if (dateDifference(new Date(clickedDate), new Date()) >= 1) {
        fetchAllAds();
      }
    } else {
      fetchAllAds();
    }
  }, [randomTime < 5000 ? 5000 : randomTime]);
});
