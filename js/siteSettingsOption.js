(function () {
    const modal = document.getElementById('settingModal');

    const settingBtn = document.getElementById("setting__btn");
    const mobileSettingBtn = document.getElementById("mobileSetting__btn");

    const span = document.getElementsByClassName("close")[0];

    const openModal = () => {
        settingBtn.onclick = function () {
            modal.style.display = "block";
        }
        mobileSettingBtn.onclick = function () {
            modal.style.display = "block";
        }
    }

    const closeModal = () => {
        span.onclick = function () {
            modal.style.display = "none";
        }
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    openModal();
    closeModal();
})();

const colorSetting = () => {
    const red_range = document.getElementById("red_range").value;
    const green_range = document.getElementById("green_range").value;
    const blue_range = document.getElementById("blue_range").value;

    const my_rgb = "rgb(" + red_range + "," + green_range + "," + blue_range + ")";

    //#TODO change id element to properly name
    document.getElementById('swatch').style.backgroundColor = my_rgb;
    document.getElementById('weather-widget').style.backgroundColor = my_rgb;
    document.getElementById('temp').style.backgroundColor = my_rgb;
}
