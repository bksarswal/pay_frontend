import { useState } from "react";
import axios from "axios";

function SendPaymentForm() {
  const [name, setName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const backendUrl = "http://localhost:8080";

  const sendPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const paymentData = {
      name,
      amount,
      paymentMethod,
      upiId: paymentMethod === "upi" ? upiId : null,
      accountNumber: paymentMethod === "bank" ? accountNumber : null,
      ifsc: paymentMethod === "bank" ? ifsc : null,
    };

    try {
      const response = await axios.post(`${backendUrl}/send-payment`, paymentData);

      if (response.data.success) {
        setSuccess("Payment Sent Successfully!");
      } else {
        setError("Payment Failed! Try Again.");
      }
    } catch (error) {
      console.error("Error sending payment:", error);
      setError("Payment request failed. Check details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-blue-500 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Send Payment</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}

      <form onSubmit={sendPayment} className="flex flex-col gap-4">
        <input
          className="border bg-white rounded-lg p-2 border-indigo-300"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
          required
        />

        <select
          className="border bg-white rounded-lg p-2 border-indigo-300"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="upi">UPI</option>
          <option value="bank">Bank Transfer</option>
        </select>

        {paymentMethod === "upi" && (
          <input
            className="border bg-white rounded-lg p-2 border-indigo-300"
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="Enter UPI ID (e.g., user@upi)"
            required
          />
        )}

        {paymentMethod === "bank" && (
          <>
            <input
              className="border bg-white rounded-lg p-2 border-indigo-300"
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter Account Number"
              required
            />
            <input
              className="border bg-white rounded-lg p-2 border-indigo-300"
              type="text"
              value={ifsc}
              onChange={(e) => setIfsc(e.target.value)}
              placeholder="Enter IFSC Code"
              required
            />
          </>
        )}

        <input
          type="number"
          placeholder="Enter Amount in Rs"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="border bg-white rounded-lg p-2 border-indigo-300"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          {loading ? "Processing..." : "Send Money"}
        </button>
      </form>
    </div>
  );
}

export default SendPaymentForm;
