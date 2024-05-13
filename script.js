//add listeners to nav btns for active status
const main_btns_container = document.querySelector(
  "#navbarSupportedContent>ul"
);
const main_btns = main_btns_container.querySelectorAll("li.nav-item>a");

addListenersToBtns(main_btns, setNavBtnAsActive);

//add listeners to portfolio btns for active status
const portfolio = document.querySelector("section#portfolio");
const portfolio_btns_container = portfolio.querySelector("div.navbar-nav");
const btns = portfolio.querySelectorAll("div.navbar-nav>a");

addListenersToBtns(btns, setPortfolioBtnAsActive);

function addListenersToBtns(btns, func) {
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", func);
  }
}

//add class active to active main btn
function setNavBtnAsActive() {
  let prevActiveBtn = main_btns_container.querySelector(".active");
  prevActiveBtn.classList.remove("active");
  this.classList.add("active");
}

//add class activ to active portfolio btn
function setPortfolioBtnAsActive() {
  let prevActiveBtn = portfolio_btns_container.querySelector(".active");
  prevActiveBtn.classList.remove("active");
  this.classList.add("active");
}
//filter function to show projects by type
function filter(e, class_name) {
  e.preventDefault();
  const projects = portfolio.querySelectorAll("div.img_col");

  for (const project of projects) {
    if (project.classList.contains(class_name)) {
      project.style.display = "block";
    } else {
      project.style.display = "none";
    }
  }
}

const onSubmitHendler = async (e) => {
  e.preventDefault();
  console.log(e.target);
  sendEmail(
    e.target.title.value,
    e.target.text.value,
    e.target.name.value,
    e.target.email.value
  );
};

async function sendEmail(
  subject = "no subject",
  message = "no text",
  name = "no name",
  email,
) {
  console.log(subject, message, name, email);
  try {
    const resp = await fetch("https://talktome-7yh9.onrender.com/api/emailer/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject,
        message,
        name,
        email,
      }),
    });

    if (resp.ok) {
      alert("Your message sent, thanks!");
    } else {
      alert("Oops, something went wrong... =O");
      console.log(resp);
    }
  } catch (err) {
    console.log(err);
    alert("Oops, something went wrong..");
  }
}
