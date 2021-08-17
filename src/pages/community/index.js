import React, { useState } from "react";
import Helpheader from "../../components/Help/HelpHeader";
import retirement from "../../assets/community/retirement.png";
import PostComponent from "../../components/Community/PostComponent";
import LeftPanel from "../../components/LeftPanel";
import styles from "../../styles/Community/community.module.scss";
import CommunityApis from "../../actions/apis/CommunityApis";
import Toast from "../../components/Toast";
function Community({ topusersdata, announcementsdata, postsdata }) {
  const [openLeftPanel, setOpenLeftPanel] = useState(false);
  const [page, setpage] = useState(2);
  const [posts, setposts] = useState(postsdata.rows || []);
  const [toastdata, settoastdata] = useState({
    show: false,
    type: "success",
    msg: "",
  });
  let tempannouncements = [
    {
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis",
      msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatisLorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis",
    },
    {
      title: "We are announcing an exciting new feature today!",
      msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatisLorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis",
    },
    {
      title: "We are announcing an exciting new feature today!",
      msg: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatisLorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis",
    },
  ];
  let topics = [
    "Finance",
    "Education",
    "Stock Market",
    "Business",
    "Woman in finance",
    "Career Tips",
    "Retirement",
    "Retirement",
  ];

  async function getmoreposts() {
    let postsres = await CommunityApis.getallposts({ page: page });
    if (postsres && postsres.data && postsres.data.success)
      setposts((prev) => [...prev, ...postsres.data.data.rows]);
    setpage((prev) => prev + 1);
  }

  async function addpost() {
    let newpost = {
      title: "New Test",
      content:
        "took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
      comment_count: 0,
      votes: 0,
    };
    let response = await CommunityApis.addpost(newpost);
    if (response && response.data && response.data.success) {
      setposts((prev) => [response.data.data, ...prev]);
      settoastdata({
        show: true,
        type: "success",
        msg: response.data.message,
      });
    } else {
      settoastdata({
        show: true,
        type: "error",
        msg: response?.data?.message || "Server Offline",
      });
    }
  }
  return (
    <div className={styles.communityPage}>
      <Toast data={toastdata} />
      <Helpheader
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <LeftPanel
        openLeftPanel={openLeftPanel}
        setOpenLeftPanel={setOpenLeftPanel}
      />
      <div className={styles.welcome}>
        <div className={styles.left}>
          <p className={styles.top}>Welcome to the</p>
          <p className={styles.bottom}>Community Forum!</p>
        </div>
        <div className={styles.right}>
          <svg
            width="365"
            viewBox="0 0 365 190"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="320" cy="138" r="45" fill="#4166EB" />
            <circle cx="20.5" cy="162.5" r="20.5" fill="#FF6263" />
            <circle cx="308.5" cy="73.5" r="20.5" fill="#FDCC03" />
            <path
              d="M254.744 152.744C298.087 111.729 299.974 43.343 258.959 -0.000106646L102 148.529C143.015 191.872 211.401 193.759 254.744 152.744Z"
              fill="#17D1BC"
            />
          </svg>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.main}>
          <div className={styles.left}>
            <div className={styles.announcements}>
              <div className={styles.heading}>
                Announcements{" "}
                <svg
                  width="21"
                  height="16"
                  viewBox="0 0 21 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.5709 7.5407H17.3638H0.959731C0.705872 7.5407 0.5 7.74657 0.5 8.00043C0.5 8.25424 0.705897 8.46016 0.959731 8.46016H17.3638H18.5708L17.7173 9.3137L13.2136 13.8176L13.2136 13.8176C13.034 13.9972 13.034 14.2881 13.2135 14.4677C13.2135 14.4677 13.2135 14.4678 13.2136 14.4678M18.5709 7.5407L14.2173 14.8214C14.0299 15.0086 13.7843 15.1024 13.5387 15.1024C13.293 15.1024 13.0474 15.0086 12.86 14.8214L13.2136 14.4678M18.5709 7.5407L17.7173 6.68714L13.2134 2.18324C13.0338 2.00367 13.0338 1.71263 13.2134 1.53306C13.3929 1.35356 13.6841 1.35356 13.8636 1.53306L20.0059 7.67534L20.3594 7.32178L20.0059 7.67534C20.1854 7.85491 20.1854 8.14595 20.0059 8.32552L20.3519 8.67155L20.0059 8.32552L13.8639 14.4677M18.5709 7.5407L13.8639 14.4677M13.2136 14.4678C13.3035 14.5576 13.4204 14.6024 13.5387 14.6024C13.6569 14.6024 13.7738 14.5576 13.8639 14.4677M13.2136 14.4678L13.8639 14.4677"
                    fill="black"
                    stroke="white"
                  />
                </svg>
              </div>
              <div className={styles.wrapper}>
                {announcementsdata.rows?.map((item) => {
                  return (
                    <div className={styles.announcement}>
                      <p className={styles.title}>{item.heading}</p>
                      <p className={styles.msg}>{item.details}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.posts}>
              <div className={styles.heading}>
                All Topics{" "}
                <svg
                  width="21"
                  height="16"
                  viewBox="0 0 21 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.5709 7.5407H17.3638H0.959731C0.705872 7.5407 0.5 7.74657 0.5 8.00043C0.5 8.25424 0.705897 8.46016 0.959731 8.46016H17.3638H18.5708L17.7173 9.3137L13.2136 13.8176L13.2136 13.8176C13.034 13.9972 13.034 14.2881 13.2135 14.4677C13.2135 14.4677 13.2135 14.4678 13.2136 14.4678M18.5709 7.5407L14.2173 14.8214C14.0299 15.0086 13.7843 15.1024 13.5387 15.1024C13.293 15.1024 13.0474 15.0086 12.86 14.8214L13.2136 14.4678M18.5709 7.5407L17.7173 6.68714L13.2134 2.18324C13.0338 2.00367 13.0338 1.71263 13.2134 1.53306C13.3929 1.35356 13.6841 1.35356 13.8636 1.53306L20.0059 7.67534L20.3594 7.32178L20.0059 7.67534C20.1854 7.85491 20.1854 8.14595 20.0059 8.32552L20.3519 8.67155L20.0059 8.32552L13.8639 14.4677M18.5709 7.5407L13.8639 14.4677M13.2136 14.4678C13.3035 14.5576 13.4204 14.6024 13.5387 14.6024C13.6569 14.6024 13.7738 14.5576 13.8639 14.4677M13.2136 14.4678L13.8639 14.4677"
                    fill="black"
                    stroke="black"
                  />
                </svg>
              </div>

              <div className={styles.topics}>
                {topics.map((topic) => (
                  <p className={styles.topic}>{topic}</p>
                ))}
              </div>
              <div className={styles.wrapper}>
                {posts.map((post) => {
                  return <PostComponent post={post} />;
                })}
                {posts.length !== postsdata.count ? (
                  <div className={styles.loadmorebutton} onClick={getmoreposts}>
                    Load More{" "}
                    <svg
                      width="16"
                      height="18"
                      viewBox="0 0 16 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 17V1"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M1 10L8 17L15 10"
                        stroke="black"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.top}>
              <div className={`${styles.communitycard} ${styles.quickstart}`}>
                <svg
                  width="30"
                  height="48"
                  viewBox="0 0 30 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.56039 1.07694C7.6518 0.76594 7.84151 0.492927 8.10108 0.298782C8.36066 0.104637 8.67615 -0.000189548 9.0003 2.573e-07H20.9995C21.2371 0.00018057 21.4712 0.0567746 21.6826 0.165123C21.8939 0.273472 22.0766 0.430477 22.2154 0.623213C22.3542 0.81595 22.4453 1.03891 22.4811 1.27373C22.517 1.50855 22.4965 1.74852 22.4214 1.97388L17.0818 17.9989H28.4991C28.7799 17.9987 29.0552 18.0774 29.2936 18.226C29.5319 18.3746 29.7238 18.5872 29.8473 18.8394C29.9708 19.0917 30.0209 19.3736 29.9921 19.653C29.9632 19.9324 29.8564 20.1981 29.684 20.4198L8.68532 47.4182C8.47021 47.6961 8.16433 47.8896 7.82108 47.9651C7.47783 48.0405 7.11899 47.993 6.80719 47.8308C6.4954 47.6687 6.25044 47.4022 6.11506 47.0779C5.97969 46.7535 5.9625 46.392 6.06649 46.0563L11.4691 28.4983H1.50078C1.26759 28.4984 1.03758 28.4442 0.829016 28.3399C0.620453 28.2356 0.439082 28.0841 0.299307 27.8974C0.159532 27.7108 0.0652045 27.4941 0.0238151 27.2646C-0.0175743 27.0351 -0.00488544 26.7991 0.0608745 26.5754L7.56039 1.07694Z"
                    fill="white"
                  />
                </svg>
                <div className={styles.text}>
                  <p className={styles.heading}>Upsurge</p>
                  <p className={styles.heading}>Quickstart Guide</p>
                  <p className={styles.go}>
                    Get the guide
                    <svg
                      width="11"
                      height="7"
                      viewBox="0 0 11 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.22247 3.29428H8.68272H1.34772C1.23421 3.29428 1.14215 3.38633 1.14215 3.49985C1.14215 3.61334 1.23422 3.70541 1.34772 3.70541H8.68272H9.22246L8.84081 4.08707L6.82697 6.10098L6.82697 6.10098C6.74669 6.18126 6.74668 6.31138 6.82694 6.39167C6.82695 6.39168 6.82696 6.39169 6.82697 6.39171M9.22247 3.29428L7.27579 6.5498C7.19199 6.63353 7.08216 6.67548 6.97234 6.67548C6.86251 6.67548 6.75265 6.63353 6.66888 6.5498M9.22247 3.29428L8.84081 2.91262L6.8269 0.898714C6.74661 0.818419 6.74661 0.688281 6.8269 0.607987C6.90716 0.527727 7.03737 0.527727 7.11763 0.607987L9.86413 3.35448C9.94442 3.43478 9.94442 3.56491 9.86413 3.64521L10.0222 3.8033L9.86412 3.64521L7.11776 6.39164M9.22247 3.29428L7.11776 6.39164M6.82697 6.39171L6.66888 6.5498M6.82697 6.39171C6.86717 6.43186 6.91944 6.45191 6.97234 6.45191C7.02522 6.45191 7.0775 6.43187 7.11776 6.39164M6.82697 6.39171L7.11776 6.39164M6.66888 6.5498C6.50128 6.38219 6.50128 6.11049 6.66888 5.94289L8.45915 4.15256M6.66888 6.5498L8.45915 4.15256M8.45915 4.15256H8.68272V3.92899L8.52462 3.7709L8.36654 3.92899H1.34772C1.11073 3.92899 0.918579 3.7368 0.918579 3.49985C0.918579 3.26286 1.11073 3.07071 1.34772 3.07071H8.36654L8.52463 3.2288L8.68272 3.07071V2.84713L8.45915 4.15256Z"
                        fill="black"
                        stroke="white"
                        stroke-width="0.447146"
                      />
                    </svg>
                  </p>
                </div>
              </div>
              <div className={`${styles.communitycard} ${styles.suggestion}`}>
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.875 39.875H26.125V42.625H17.875V39.875Z"
                    fill="#FDCC04"
                  />
                  <path d="M16.5 35.75H27.5V38.5H16.5V35.75Z" fill="#FDCC04" />
                  <path
                    d="M31.7471 5.38746C29.1629 2.79988 25.7014 1.37504 22 1.37504C20.1932 1.37073 18.4032 1.72345 16.7331 2.41292C15.0629 3.1024 13.5454 4.11505 12.2677 5.39272C10.9901 6.67038 9.9774 8.18788 9.28792 9.85805C8.59845 11.5282 8.24573 13.3182 8.25004 15.125C8.25004 19.1314 9.78574 22.8792 12.461 25.4066L12.8357 25.7581C14.3834 27.2053 16.5 29.1879 16.5 30.9375V34.375H20.625V23.1267L16.8197 20.9688L18.3907 18.7104L22 20.625L25.5484 18.7009L27.1898 20.9078L23.375 23.1421V34.375H27.5V30.9375C27.5 29.2291 29.5935 27.2482 31.1223 25.8011L31.5443 25.4006C34.296 22.7735 35.75 19.2165 35.75 15.125C35.7591 13.318 35.4101 11.527 34.723 9.85567C34.0359 8.1843 33.0245 6.66565 31.7471 5.38746Z"
                    fill="#FDCC04"
                  />
                </svg>

                <div className={styles.text}>
                  <p className={styles.heading}>Suggestions</p>
                  <p className={styles.heading}>& Course Requests</p>
                  <p className={styles.go}>
                    Make a suggestion
                    <svg
                      width="11"
                      height="7"
                      viewBox="0 0 11 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.22247 3.29428H8.68272H1.34772C1.23421 3.29428 1.14215 3.38633 1.14215 3.49985C1.14215 3.61334 1.23422 3.70541 1.34772 3.70541H8.68272H9.22246L8.84081 4.08707L6.82697 6.10098L6.82697 6.10098C6.74669 6.18126 6.74668 6.31138 6.82694 6.39167C6.82695 6.39168 6.82696 6.39169 6.82697 6.39171M9.22247 3.29428L7.27579 6.5498C7.19199 6.63353 7.08216 6.67548 6.97234 6.67548C6.86251 6.67548 6.75265 6.63353 6.66888 6.5498M9.22247 3.29428L8.84081 2.91262L6.8269 0.898714C6.74661 0.818419 6.74661 0.688281 6.8269 0.607987C6.90716 0.527727 7.03737 0.527727 7.11763 0.607987L9.86413 3.35448C9.94442 3.43478 9.94442 3.56491 9.86413 3.64521L10.0222 3.8033L9.86412 3.64521L7.11776 6.39164M9.22247 3.29428L7.11776 6.39164M6.82697 6.39171L6.66888 6.5498M6.82697 6.39171C6.86717 6.43186 6.91944 6.45191 6.97234 6.45191C7.02522 6.45191 7.0775 6.43187 7.11776 6.39164M6.82697 6.39171L7.11776 6.39164M6.66888 6.5498C6.50128 6.38219 6.50128 6.11049 6.66888 5.94289L8.45915 4.15256M6.66888 6.5498L8.45915 4.15256M8.45915 4.15256H8.68272V3.92899L8.52462 3.7709L8.36654 3.92899H1.34772C1.11073 3.92899 0.918579 3.7368 0.918579 3.49985C0.918579 3.26286 1.11073 3.07071 1.34772 3.07071H8.36654L8.52463 3.2288L8.68272 3.07071V2.84713L8.45915 4.15256Z"
                        fill="black"
                        stroke="white"
                        stroke-width="0.447146"
                      />
                    </svg>
                  </p>
                </div>
              </div>
              <div className={styles.communitybigcard}>
                <img src={retirement.src} alt="" />
                <div className={styles.text}>
                  <p className={styles.heading}>Free Webinar on</p>
                  <p className={styles.heading}>Retirement Planning</p>
                  <p className={styles.go}>
                    Register
                    <svg
                      width="11"
                      height="7"
                      viewBox="0 0 11 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.22247 3.29428H8.68272H1.34772C1.23421 3.29428 1.14215 3.38633 1.14215 3.49985C1.14215 3.61334 1.23422 3.70541 1.34772 3.70541H8.68272H9.22246L8.84081 4.08707L6.82697 6.10098L6.82697 6.10098C6.74669 6.18126 6.74668 6.31138 6.82694 6.39167C6.82695 6.39168 6.82696 6.39169 6.82697 6.39171M9.22247 3.29428L7.27579 6.5498C7.19199 6.63353 7.08216 6.67548 6.97234 6.67548C6.86251 6.67548 6.75265 6.63353 6.66888 6.5498M9.22247 3.29428L8.84081 2.91262L6.8269 0.898714C6.74661 0.818419 6.74661 0.688281 6.8269 0.607987C6.90716 0.527727 7.03737 0.527727 7.11763 0.607987L9.86413 3.35448C9.94442 3.43478 9.94442 3.56491 9.86413 3.64521L10.0222 3.8033L9.86412 3.64521L7.11776 6.39164M9.22247 3.29428L7.11776 6.39164M6.82697 6.39171L6.66888 6.5498M6.82697 6.39171C6.86717 6.43186 6.91944 6.45191 6.97234 6.45191C7.02522 6.45191 7.0775 6.43187 7.11776 6.39164M6.82697 6.39171L7.11776 6.39164M6.66888 6.5498C6.50128 6.38219 6.50128 6.11049 6.66888 5.94289L8.45915 4.15256M6.66888 6.5498L8.45915 4.15256M8.45915 4.15256H8.68272V3.92899L8.52462 3.7709L8.36654 3.92899H1.34772C1.11073 3.92899 0.918579 3.7368 0.918579 3.49985C0.918579 3.26286 1.11073 3.07071 1.34772 3.07071H8.36654L8.52463 3.2288L8.68272 3.07071V2.84713L8.45915 4.15256Z"
                        fill="black"
                        stroke="white"
                        stroke-width="0.447146"
                      />
                    </svg>
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.button} onClick={addpost}>
                + Start a New Topic
              </div>
              <div className={styles.heading}>Top Users</div>
              <div className={styles.wrapper}>
                {topusersdata.rows?.map((user) => {
                  return (
                    <div className={styles.topuser} key={user.user_id}>
                      <img src={user.user_img_url} alt="" />
                      <p className={styles.name}>{user.user_name}</p>
                      <p className={styles.votes}>
                        {user.total_votes}{" "}
                        <svg
                          width="9"
                          height="9"
                          viewBox="0 0 9 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.84371 1.89215L4.84371 0.685039L3.99016 1.53859L1.38867 4.14008C1.36743 4.16133 1.33304 4.16133 1.3118 4.14008C1.2906 4.11888 1.2906 4.08441 1.3118 4.06321L4.85962 0.515382C4.88087 0.494138 4.91525 0.494138 4.9365 0.515382L5.29005 0.161828L4.9365 0.515385L8.48418 4.06297C8.48418 4.06297 8.48418 4.06298 8.48418 4.06298C8.49506 4.07386 8.50024 4.08703 8.50024 4.10156C8.50024 4.11615 8.49502 4.1293 8.48425 4.14007C8.463 4.16124 8.42867 4.16121 8.40745 4.13999L8.40744 4.13999L5.80596 1.53859L4.95241 0.685068L4.95241 1.89215L4.95241 8.0394C4.95241 8.06937 4.92803 8.09375 4.89806 8.09375C4.86807 8.09375 4.84371 8.06939 4.84371 8.0394L4.84371 1.89215Z"
                            fill="black"
                            stroke="#4166EB"
                          />
                        </svg>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;

export async function getServerSideProps({ params, req }) {
  let token = req.cookies.accesstoken;
  const propsdata = {
    announcementsdata: { count: 0, rows: [] },
    topusersdata: { count: 0, rows: [] },
    postsdata: { count: 0, rows: [] },
  };

  let response = await CommunityApis.gettopusers();
  if (response && response.data && response.data.success) {
    propsdata.topusersdata = response.data.data;
  }
  let announcementres = await CommunityApis.getannouncements();
  if (announcementres && announcementres.data && announcementres.data.success) {
    propsdata.announcementsdata = announcementres.data.data;
  }
  let postsres = await CommunityApis.getallposts({ page: 1 });
  if (postsres && postsres.data && postsres.data.success)
    propsdata.postsdata = postsres.data.data;
  return {
    props: propsdata,
  };
}
