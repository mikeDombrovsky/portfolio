

//add listeners to nav btns for active status
const main_btns_container = document.querySelector(
  "#navbarSupportedContent>ul"
);
const main_btns = main_btns_container.querySelectorAll("li.nav-item>a");

addListenersToBtns(main_btns, setMainBtnAsActive);

//add listeners to portfolio btns for active status
const portfolio = document.querySelector("section#portfolio");
const btnContainer = portfolio.querySelector("div.navbar-nav");
const btns = portfolio.querySelectorAll("div.navbar-nav>a");

addListenersToBtns(btns, setBtnAsActive);

// const sendEmilBtn = document.querySelector("form#email_form");

function addListenersToBtns(btns, func) {
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", func);
  }
}

//add class active to active main btn
function setMainBtnAsActive() {
  let prevActiveBtn = main_btns_container.querySelector(".active");
  prevActiveBtn.classList.remove("active");
  this.classList.add("active");
}

//add class activ to active portfolio btn
function setBtnAsActive() {
  let prevActiveBtn = btnContainer.querySelector(".active");
  prevActiveBtn.classList.remove("active");
  this.classList.add("active");
}
//filter function to show projects by type
function filter(e, class_name) {
  e.preventDefault();
  console.log("filter " + class_name);
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
  console.log(e.target.subject);
  sendEmail(
    e.target.email.value,
    e.target.name.value,
    e.target.title.value,
    e.target.text.value
  );
};

async function sendEmail(
  fromEmail,
  name = "no name",
  subject = `no subject`,
  text = "no text",
  html = "<h2>No html...</h2>"
) {
  const SENDGRID_API_HOST = "https://api.sendgrid.com/v3/mail/send";
  SENDGRID_API_KEY = getApiKey()
  const json_data = `{
        "personalizations":[{
            "to":[{"email":"madombrovsky@gmail.com","name":"Michael Dombrovsky"}],
            "subject":"${subject}"
        }],
        "content": [{"type": "text/plain", "value": "${text}"}],
        "from":{"email":"${fromEmail}","name":"${name}"},
        "reply_to":{"email":"${fromEmail}","name":"${name}"}
    }`;

  try {
    const resp = await fetch(SENDGRID_API_HOST, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + SENDGRID_API_KEY,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: json_data,
    });

    if (resp.ok) {
      console.log("Email sent!");
    } else {
      console.log(resp);
    }
  } catch (err) {
    console.log(err);
  }
}



