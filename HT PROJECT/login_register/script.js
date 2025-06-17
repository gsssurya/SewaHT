const login = document.getElementById("login");
      const registrasi = document.getElementById("registrasi");
      function toLogin() {
        login.style.animation = "slideDown 2s ease forwards";
        registrasi.style.animation = "slideUp 2s ease forwards";
      }
      function toRegis() {
        document.getElementById("login").style.animation =
          "slideUp 2s ease forwards";
        document.getElementById("registrasi").style.animation =
          "slideDown 2s ease forwards";
      }