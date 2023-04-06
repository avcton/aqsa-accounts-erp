import React from "react";

const JournalVoucher = () => {
  return (
    <div className=" flex flex-col bg-slate-50 text-black  mt-14 items-center justify-center h-screen w-screen overflow-auto">
      <h3 className=" text-black text-3xl font-bold mt-10 mb-6 ">Journal Voucher</h3>
      <div>
        <div className="store-info">
          <h3>Aqsa Traders</h3>
          <p>Townsville</p>
          <p>123#</p>
        </div>
        <div className="voucher-info">
          <p>Date: <span>April 4, 2023</span></p>
          <p>Voucher #: <span>123456</span></p>
          <p>Description: <span>Journal voucher for April rent</span></p>
        </div>
        <div className="entries px-4 py-5">
          <table>
            <thead>
              <tr>
                <th>Account</th>
                <th>Debit</th>
                <th>Credit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Account 1</td>
                <td>$500.00</td>
                <td> $0</td>
              </tr>
              <tr>
                <td>Account 2</td>
                <td>  $0</td>
                <td>$500.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="footer">
          <p>Prepared by: <span>John Doe</span></p>
          <p>Approved by: <span>Jane Doe</span></p>
        </div>
      </div>
      <button className="text-white mt-5" onClick={() => { }}>Save</button>
    </div>
  );
};

export default JournalVoucher;