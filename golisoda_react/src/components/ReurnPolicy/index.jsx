import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

function ReturnPolicy() {
  return (
    <div>
      <section className="bg-banner-liner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="banner-liners">
                <h1>Return Policy</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="common-content-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p><Link to="http://golisodastore.com" target="_blank">http://golisodastore.com</Link> policy lasts 30 days.</p>
              <p>
                If 15 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange.
              </p>
              <p>
                To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
              </p>
              <p>
                Several types of goods are exempt from being returned. Perishable goods such as food, flowers, newspapers or magazines cannot be returned. We also do not accept products that are intimate or sanitary goods, hazardous materials, or flammable liquids or gases.
              </p>
              <h2 className="common-heads">Additional non-returnable items:</h2>
              <ul>
                <li>Gift cards</li>
                <li>Some health and personal care items</li>
              </ul>
              <p>To complete your return, we require a receipt or proof of purchase.</p>
              <p>Please do not send your purchase back to the manufacturer.</p>
              <h2 className="common-heads">Refunds (if applicable)</h2>
              <p>
                Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
                If you are approved, then your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment, within a certain amount of days.
              </p>
              <h2 className="common-heads">Late or missing refunds (if applicable)</h2>
              <p>
                If you haven’t received a refund yet, first check your bank account again.
                Then contact your credit card company, it will take 7 working days  before your refund is officially posted.
                Next contact your bank. There is often some processing time before a refund is posted.
                If you’ve done all of this and you still have not received your refund yet, please contact us at
                info@golisodastore.com
              </p>
              <h2 className="common-heads">Sale items (if applicable)</h2>
              <p>
                Only regular priced items may be refunded, unfortunately sale items cannot be refunded.
              </p>
              <h2 className="common-heads">Exchanges (if applicable)</h2>
              <p>
                We only replace items if they are defective or damaged.  If you need to exchange it for the same item, send us an email at email and send your item to:
              </p>
              <p>No.4, 2nd Street, Dr.Radhakrishnan Salai, Mylapore, Chennai - 600004 Tamilnadu, India</p>
              <h2 className="common-heads">Gifts</h2>
              <p>
                If the item was marked as a gift when purchased and shipped directly to you, you’ll receive a gift credit for the value of your return. Once the returned item is received, a gift certificate will be mailed to you.
                If the item wasn’t marked as a gift when purchased, or the gift giver had the order shipped to themselves to give to you later, we will send a refund to the gift giver and he will find out about your return.
              </p>
              <h2 className="common-heads">Shipping</h2>
              <p>
                Once you have requested a return and filled out the return form, pack the products in their original packaging, stick the return form on and box and handover to the courier agent.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default ReturnPolicy;
