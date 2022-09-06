import React, { useEffect, useState } from "react";
import TemplateCard from "./TemplateCard";
import styles from "../../styles/Chores/chorecategoryselection.module.scss";
import DownArrowFilled from "../SVGcomponents/DownArrowFilled";
import BackArrow from "../SVGcomponents/BackArrow";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useRouter } from "next/dist/client/router";
import { choretemplates } from "../../helpers/choretemplates";
import ChoreApis from "../../actions/apis/ChoreApis";
import { getCookie } from "../../actions/cookieUtils";
import CancelIcon from '@mui/icons-material/Cancel';

function ChoreCategorySelection({ setmode, setStoryIndex, tourActive,setshowmodal }) {
  const [showtemps, setshowtemps] = useState(false);
  const router = useRouter();
  const [showfull, setshowfull] = useState(false);
  const [selectedcat, setselectedcat] = useState("HouseHold");
  const [temps, settemps] = useState([]);
  useEffect(() => {
    let arr =
      choretemplates[
        choretemplates.findIndex((item) => item.name === selectedcat)
      ].templates;
    gettemplates();
    async function gettemplates() {
      let res = await ChoreApis.gettemplates(
        { category: selectedcat },
        getCookie("accesstoken")
      );
      console.log(res.data.data);
      if (res && res.data && res.data.success) {
        settemps([...res.data.data, ...arr]);
      } else {
        settemps(arr);
      }
    }
  }, [selectedcat]);

  async function handledelete(id) {
    let res = await ChoreApis.deletetemplate({ id }, getCookie("accesstoken"));
    if (res && res.data && res.data.success) {
      settemps((prev) => prev.filter((item) => item.id !== id));
    }
  }

  return (
    <div className={styles.choreCategorySelection}>
      {!showfull ? (
        <div className={styles.catselection}>
          <h2>Create chore from template
          <CancelIcon className={styles.CancelIcon} onClick={()=>{setshowmodal(false)}} />
          </h2>
          <div className={styles.wrapper}>
            {choretemplates.map((item, index) => {
              return (
                <TemplateCard
                  key={"templatecard" + index}
                  name={item.name}
                  image={item.image}
                  selected={selectedcat}
                  setselected={setselectedcat}
                />
              );
            })}
          </div>

          <div
            className={styles.button}
            onClick={() => {
              setStoryIndex((prev) => prev + 1);
              setshowfull(true);
            }}
          >
            Continue
          </div>
        </div>
      ) : (
        <div className={styles.choreTemplateSelection}>
          <div className={styles.header}>
            <BackArrow onClick={() => setshowfull(false)} />
            <div className={styles.text}>
              <p className={styles.heading}>Create chore from template</p>
              <p className={styles.category}>{selectedcat}</p>
            </div>
          </div>
          <div className={styles.wrapper}>
            {temps.map((item, index) => {
              return (
                <div
                  className={styles.card}
                  key={item.id || "templatecardselection" + index}
                >
                  <img src={item.img || item.img_url} alt="" />
                  <div className={styles.text}>
                    <p className={styles.name}>{item.name}</p>
                    <p className={styles.time}>{item.time}</p>
                    <div className={styles.mobilediv}>
                      {item.id && (
                        <div
                          className={styles.delete}
                          onClick={() => handledelete(item.id)}
                        >
                          Delete{" "}
                          <DeleteRoundedIcon className={styles.deleteicon} />
                        </div>
                      )}
                      <div
                        className={styles.button}
                        onClick={() => {
                          router.push(
                            "/dashboard/p/managechore/new?template=" +
                              item.name.replace(/ /g, "-") +
                              "&templatecat=" +
                              selectedcat +
                              (item.id ? "&templateid=" + item.id : "") +
                              (tourActive
                                ? "&showTour=true?pushTo=/dashboard/p/?storyIndex=10"
                                : "")
                          );
                        }}
                      >
                        Use Template
                      </div>
                    </div>
                    {item.id && (
                      <div
                        className={styles.delete}
                        onClick={() => handledelete(item.id)}
                      >
                        Delete{" "}
                        <DeleteRoundedIcon className={styles.deleteicon} />
                      </div>
                    )}
                  </div>
                  <div
                    className={styles.button}
                    onClick={() => {
                      router.push(
                        "/dashboard/p/managechore/new?template=" +
                          item.name.replace(/ /g, "-") +
                          "&templatecat=" +
                          selectedcat +
                          (item.id ? "&templateid=" + item.id : "") +
                          (tourActive
                            ? "&showTour=true?pushTo=/dashboard/p/?storyIndex=10"
                            : "")
                      );
                    }}
                  >
                    Use Template
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ChoreCategorySelection;
