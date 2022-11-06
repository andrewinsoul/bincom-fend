export const RenderTable = ({
  data,
  tableHeadItemArray,
  tableDataArray,
  buttonFunction,
  buttonFunctionArg1,
  buttonFunctionArg2,
  buttonText,
  buttonFunction2,
  buttonFunctionArg21,
  buttonFunctionArg22,
  buttonText2,
}) => (
  <table className="faint-bg-color table">
    <thead>
      <tr>
        {tableHeadItemArray.map((item, index_) => (
          <th key={`index-${index_}`}>{item}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data?.map((item, index) => (
        <tr
          className={`text-left ${
            index % 2 === 0 ? "grey-bg-darker" : "grey-bg"
          }`}
          key={`state-${index}`}
        >
          {tableDataArray.map((item_, index__) => (
            <td key={`index-${index__}-${item_}`} className={`px-23`}>
              {item[item_] || "N/A"}
            </td>
          ))}
          {buttonFunction ? (
            <td className={`px-23 text-right push-left`}>
              <div className="push-left row">
                <button
                  onClick={buttonFunction(
                    item[buttonFunctionArg1],
                    item[buttonFunctionArg2]
                  )}
                  className="py-6"
                >
                  {buttonText}
                </button>

                {buttonFunction2 ? (
                  <button
                    onClick={buttonFunction2(
                      item[buttonFunctionArg21],
                      item[buttonFunctionArg22]
                    )}
                    className="py-6 mx-4"
                  >
                    {buttonText2}
                  </button>
                ) : null}
              </div>
            </td>
          ) : null}
        </tr>
      ))}
    </tbody>
  </table>
);
