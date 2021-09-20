const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $("header h2");
const cdthumb = $(".cd-thumb");
const audio = $("#audio");
const cd = $(".cd");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $(".progress");
const nextBtn = $(".btn-next");
const preBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");
const settingLocal = "config";
const app = {
  isPlaying: false,
  isRandom: false,
  isRepreat: false,
  currentIndex: 0,
  settings: JSON.parse(localStorage.getItem(settingLocal)) || {},
  setConfig: function (key, value) {
    this.settings[key] = value;
    localStorage.setItem(settingLocal, JSON.stringify(this.settings));
  },
  songs: [
    {
      name: "Chỉ Là Không Cùng Nhau",
      singer: "Tăng Phúc - Trương Thảo Nhi",
      path: "https://data.chiasenhac.com/down2/2163/3/2162259-292560e3/128/Chi%20La%20Khong%20Cung%20Nhau%20Live%20Version_%20-%20T.mp3",
      image: "https://data.chiasenhac.com/data/cover/139/138028.jpg",
    },
    {
      name: "Em hat ai nghe",
      singer: "Orange",
      path: "https://data25.chiasenhac.com/download2/2189/3/2188236-31b59320/128/Em%20Hat%20Ai%20Nghe%20-%20Orange.mp3",
      image: "https://data.chiasenhac.com/data/cover/146/145004.jpg",
    },
    {
      name: "Sài Gòn Đau Lòng Quá",
      singer: "Hứa Kim Tuyền, Hoàng Duyên",
      path: "https://data.chiasenhac.com/down2/2162/3/2161930-9845d4d3/128/Sai%20Gon%20Dau%20Long%20Qua%20-%20Hua%20Kim%20Tuyen_%20Ho.mp3",
      image: "https://data.chiasenhac.com/data/cover/138/137965.jpg",
    },
    {
      name: "Hẹn Yêu",
      singer: "Minh Vương M4U; Thương Võ",
      path: "https://data16.chiasenhac.com/downloads/2146/3/2145480-11209867/128/Hen%20Yeu%20-%20Minh%20Vuong%20M4U_%20Thuong%20Vo.mp3",
      image: "https://data.chiasenhac.com/data/cover/134/133958.jpg",
    },
    {
      name: "Thiên Đàng",
      singer: "Wowy - JoliPoli",
      path: "https://data16.chiasenhac.com/downloads/2148/3/2147800/128/Thien%20Dang%20-%20Wowy_JoliPoli.mp3",
      image: "https://data.chiasenhac.com/data/cover/130/129107.jpg",
    },
    {
      name: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
      singer: "Ái Phương",
      path: "https://data23.chiasenhac.com/downloads/1559/3/1558873-55cdf450/128/Toi%20Thay%20Hoa%20Vang%20Tren%20Co%20Xanh%20-%20Ai%20Phuo.mp3",
      image:
        "http://khoavanhue.husc.edu.vn/wp-content/uploads/2016/11/toi-thay-hoa-vang.jpg",
    },
    {
      name: "Bông Hoa Đẹp Nhất",
      singer: "Quân A.P",
      path: "https://data3.chiasenhac.com/downloads/2116/3/2115047-a7b21f25/128/Bong%20Hoa%20Dep%20Nhat%20-%20Quan%20A_P.mp3",
      image: "https://data.chiasenhac.com/data/cover/128/127105.jpg",
    },
    {
      name: "Gặp Nhưng Không Ở Lại",
      singer: "Hiền Hồ",
      path: "https://data3.chiasenhac.com/downloads/2135/3/2134648-25a034b3/128/Gap%20Nhung%20Khong%20O%20Lai%20-%20Hien%20Ho.mp3",
      image: "https://data.chiasenhac.com/data/cover/132/131586.jpg",
    },
  ],
  render: function () {
    // const html = this.songs.map((song) => {
    //   return `<div class="song">
    //   <div
    //     class="thumb"
    //     style="
    //       background-image: url(${song.image});
    //     "
    //   ></div>
    //   <div class="body">
    //     <h3 class="title">${song.name}</h3>
    //     <p class="author">${song.singer}</p>
    //   </div>
    //   <div class="option">
    //     <i class="fas fa-ellipsis-h"></i>
    //   </div>
    // </div>`;
    // });
    // console.log(html);
    // playlist.innerHTML = html.join("");
    this.songs.forEach((song, index) => {
      const html = `<div class="song ${
        index === this.currentIndex ? "active" : ""
      }" data-index=${index}>
      <div
        class="thumb"
        style="
          background-image: url(${song.image});
        "
      ></div>
      <div class="body">
        <h3 class="title">${song.name}</h3>
        <p class="author">${song.singer}</p>
      </div>
      <div class="option">
        <i class="fas fa-ellipsis-h"></i>
      </div>
    </div>`;
      // console.log(html);
      playlist.insertAdjacentHTML("beforeend", html);
    });
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvent: function () {
    const _this = this;
    // console.log(this, _this);
    const cdWidth = cd.offsetWidth;
    console.log(cdWidth);
    const cdThumbrorate = cdthumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });
    cdThumbrorate.pause();
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        _this.isPlaying = false;
        audio.pause();
        player.classList.remove("playing");
        cdThumbrorate.pause();
      } else {
        _this.isPlaying = true;
        audio.play();
        player.classList.add("playing");
        cdThumbrorate.play();
      }
      audio.ontimeupdate = function () {
        if (audio.duration) {
          const progressPercent = Math.floor(
            (audio.currentTime / audio.duration) * 100
          );
          progress.value = progressPercent;
        }
      };
      //Xu ly khi tua
      progress.onchange = function (e) {
        const seekTime = (audio.duration / 100) * e.target.value;
        audio.currentTime = seekTime;
      };
    };
    document.onscroll = function () {
      const scrollTop = document.documentElement.scrollTop || window.scrollY;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandom();
      } else {
        _this.nextSong();
      }
      playlist.innerHTML = "";
      _this.render();
      audio.play();
      _this.scrollToActiveSong();
    };

    preBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandom();
        this.s;
      } else {
        _this.preSong();
      }
      playlist.innerHTML = "";
      _this.render();
      audio.play();
      _this.scrollToActiveSong();
    };
    repeatBtn.onclick = function () {
      _this.isRepreat = !_this.isRepreat;
      repeatBtn.classList.toggle("active", _this.isRepreat);
      _this.setConfig("isRepeat", _this.isRepreat);
    };

    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      randomBtn.classList.toggle("active", _this.isRandom);

      _this.setConfig("isRandom", _this.isRandom);
    };
    //Xu lý next song
    audio.onended = function () {
      if (_this.isRepreat) {
        audio.play();
      } else nextBtn.onclick();
    };
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode || e.target.closest(".option")) {
        if (songNode) {
          _this.currentIndex = +songNode.dataset.index;
          _this.loadCurrentSong();
          playlist.innerHTML = "";
          _this.render();
          audio.play();
        }
        if (e.target.closest(".option")) {
        }
      }
    };
  },
  loadConfig: function () {
    this.isRandom = this.settings.isRandom;
    this.isRepreat = this.settings.isRepreat;
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdthumb.style.backgroundImage = `url(${this.currentSong.image})`;
    audio.src = this.currentSong.path;
  },
  preSong: function () {
    console.log(this.currentIndex);
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  playRandom: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    console.log(newIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 300);
  },
  start: function () {
    this.loadConfig();
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepreat);
    //Xử lí sự kiện
    this.handleEvent();
    //Định nghĩa thuộc tính object
    this.defineProperties();
    //Tai thong tin bai hat khi bao UI
    this.loadCurrentSong();
    //Render
    this.render();
  },
};
app.start();
