import React, { useEffect, useState } from "react";
import DashboardApis from "../../actions/apis/DashboardApis";
import { getCookie } from "../../actions/cookieUtils";
import styles from "../../styles/kidDashboard/addmembermodal.module.scss";
import SearchIcon from "@mui/icons-material/Search";
export default function AddTribeMemberModal({
  members,
  onConfirm,
  setmembers,
  settoastdata,
  onCancel,
}) {
  const [searchresults, setsearchresults] = useState([]);
  const [searchquery, setsearchquery] = useState("");
  const [error, seterror] = useState("");
  async function searchusers() {
    seterror("");
    let res = await DashboardApis.searchuser(
      { query: searchquery },
      getCookie("accesstoken")
    );
    console.log(res.data);

    if (res && res.data && res.data.success) {
      if (res.data.data.length > 0) {
        setsearchresults(res.data.data);
      } else {
        seterror("No results found");
      }
    } else {
      console.log(res.data);
    }
  }
  return (
    <div className={styles.addmembermodal}>
      <div className={styles.background} onClick={onCancel}></div>
      <div className={styles.box}>
        <h2>Add Member</h2>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search user"
            onChange={(e) => setsearchquery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                searchusers();
              }
            }}
          />
          <SearchIcon className={styles.icon} />
        </div>
        <div className={styles.searchwrapper}>
          {searchresults.map((item) => {
            return (
              <div className={styles.searchresult} key={item.id}>
                <img src={item.user_img_url} />
                <div className={styles.right}>
                  <div className={styles.top}>
                    <p className={styles.name}>{item.first_name}</p>
                    <p className={styles.name}>{item.last_name}</p>
                  </div>
                  <p className={styles.username}>@{item.user_name}</p>
                </div>
                {members.findIndex((data) => data.user_id === item.id) !==
                -1 ? (
                  <div className={styles.disabledbtn}>Added</div>
                ) : (
                  <div
                    className={styles.btn}
                    onClick={() =>
                      setmembers((prev) => [
                        {
                          user_id: item.id,
                          role: "member",
                          user_img_url: item.user_img_url,
                          first_name: item.first_name,
                          last_name: item.last_name,
                          user_name: item.user_name,
                        },
                        ...prev,
                      ])
                    }
                  >
                    Add
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.wrapper}>
          <div className={styles.close} onClick={onCancel}>
            Done
          </div>
        </div>
      </div>
    </div>
  );
}
