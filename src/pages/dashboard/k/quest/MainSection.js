export default function MainSection({ data }) {
  return (
    <div>
      {data &&
        data.length &&
        data.map((item) => {
          return (
            <div>
              <div>{item.title}</div>
              <div>
                {item.chapters
                  ? item.chapters.length
                    ? item.chapters.map((chp) => {
                        return <div>{chp.title}</div>;
                      })
                    : ""
                  : ""}
              </div>
            </div>
          );
        })}
    </div>
  );
}
