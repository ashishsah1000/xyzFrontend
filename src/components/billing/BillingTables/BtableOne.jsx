import React from "react";
import { useSelector } from "react-redux";
import "./tableOne.css";
export default function BtableOne({ items = [] }) {
  items = useSelector((state) => state.items.billing);
  console.log("🚀 ~ file: BtableOne.jsx ~ line 6 ~ BtableOne ~ items", items);

  return (
    <div>
      <table className="tableOne" style={{ width: "100%" }}>
        <thead>
          <th>S.NO</th>
          <th>CODE</th>
          <th>NAME</th>
          <th>QUA</th>
          <th>PRICE</th>
          <th>TOTAL</th>
        </thead>
        <tbody>
          {items.map((x, i) => {
            return (
              <tr>
                <td align="center">{i + 1}</td>
                <td align="center">{x?.itemCode}</td>
                <td align="center">{x?.itemName} </td>
                <td align="center">{x?.quantity}</td>
                <td align="center">{x?.price}</td>
                <td align="center">
                  {parseInt(x?.price) * parseInt(x?.quantity)}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot
          style={{
            border: "2px solid black",
          }}
        >
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Total</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
