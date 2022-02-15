let blogs = [];

function addBlog(event) {
  event.preventDefault();

  let title = document.getElementById("input-blog-title").value;
  let start = document.getElementById("start-date").value;
  let end = document.getElementById("end-date").value;
  let content = document.getElementById("input-blog-content").value;
  let image = document.getElementById("input-blog-image");
  image = URL.createObjectURL(image.files[0]);

  let diffTime = new Date(end) - new Date(start);
  let diffDay = Math.floor(diffTime / (1000 * 3600 * 23));
  // if (diffDay >= 1) {
  //   return Math.floor(diffDay) + ' day';
  // }
  let diffMonth = Math.floor(diffDay / 30);
  let dm = Math.floor(diffDay - diffMonth * 30);

  var vcheckbox = document.forms[0];
  var icon = "";
  var i;
  for (i = 0; i < vcheckbox.length; i++) {
    if (vcheckbox[i].checked) {
      icon = icon + vcheckbox[i].value + "";
      console.log({ icon });
    }
  }
  let blog = {
    title,
    start,
    end,
    content,
    image,
    diffDay,
    diffMonth,
    dm,
    icon,
    postedAt: new Date(),
  };

  let test = document.getElementById("contents");
  test.innerHTML = firstBlogContent;
  console.table(blog);

  let array = [title, content, image];

  blogs.push(blog);

  // console.table(blogs)

  renderBlog();
}

function renderBlog() {
  let lengData = blogs.length;

  let icon = "assets/mail.png";

  let blogContainer = document.getElementById(`contents`);
  blogContainer.innerHTML = firstBlogContent();

  let i = 0;
  for (i; i < lengData; i++) {
    blogContainer.innerHTML += `
        <div class="blog-list-item">
          <div class="blog-image">
          <a href='blog-detail.html?judul=${blogs[i].title}&images=${blogs[i].image}&start=${blogs[i].start}&end=${blogs[i].end}&dm=${blogs[i].dm}&diffMonth=${blogs[i].diffMonth}&icon=${blogs[i].icon}&content=${blogs[i].content}'
            target="_blank">
            <img src="${blogs[i].image}">
          </a>
          </div>
          <div class="blog-content">
            <h4>
              <a href="blog-detail.html" target="_blank">
              ${blogs[i].title}
              </a>
            </h4>
            <div class="detail-blog-content">
              Duration : ${blogs[i].diffMonth} month - ${blogs[i].dm} day
            </div>
            <p>
              ${blogs[i].content}
            <div class="icon">
              ${blogs[i].icon}
            </div>
            <div class="btn-group">
              <button class="btn-edit">Edit Post</button>
              <button class="btn-post">Post Blog</button>
            </div>
          </div>
        </div>
        `;
  }
}

function getDistanceTime(time) {
  const distance = new date() - new date(time);

  // Convert to day
  const miliseconds = 1000;
  const secondsInMinute = 3600; //Second in 1 minute
  const hoursInDay = 23;
  const dayDistance = distance / (miliseconds * secondsInMinute * hoursInDay);

  if (dayDistance >= 1) {
    return Math.floor(dayDistance) + " day ago";
  } else {
    // Convert to hour
    const hourDistance = Math.floor(distance / (1000 * 60 * 60));
    if (hourDistance > 0) {
      return hourDistance + " hour ago";
    } else {
      // Convert to minute
      const minuteDistance = Math.floor(distance / (1000 * 60));
      return minuteDistance + " minute ago";
    }
  }
}

function getFullTime(time) {
  const date = time.getDate();
  const monthIndex = time.getMonth();
  const year = time.getFullYear();

  const hours = time.getHours();
  const minutes = time.getMinutes();

  return `${date} ${month[monthIndex]} ${year} ${hours}:${minutes} WIB`;
}

function firstBlogContent() {
  return `<div class="blog-list-item">
    <div class="blog-image">
      <img src="assets/blog-img.png" alt="" />
    </div>
    <div class="blog-content">
      <h4>
      <a href='blog-detail.html' target="_blank">
        Pasar Coding di Indonesia Dinilai Masih Menjanjikan</a
        >
      </h4>
      <div class="detail-blog-content">
        12 Jul 2021 22:30 WIB | Ichsan Emrald Alamsyah
      </div>
      <p>
        Ketimpangan sumber daya manusia (SDM) di sektor digital masih
        menjadi isu yang belum terpecahkan. Berdasarkan penelitian
        ManpowerGroup, ketimpangan SDM global, termasuk Indonesia,
        meningkat dua kali lipat dalam satu dekade terakhir. Lorem ipsum,
        dolor sit amet consectetur adipisicing elit. Quam, molestiae
        numquam! Deleniti maiores expedita eaque deserunt quaerat! Dicta,
        eligendi debitis?
      </p>
      <div class="icon">
      </div>
      <div class="btn-group">
        <button class="btn-edit">Edit Post</button>
        <button class="btn-post">Post Blog</button>
      </div>
    </div>
  </div>
      `;
}

function passvalues() {
  var firstname = document.getElementById("input-blog-title").value;
  localStorage.setItem("textvalue", firstname);
  return false;
}
