import { useState } from "react";
import axios from "axios";

function Form() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const backendUrl = "http://localhost:8080";

  const createOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${backendUrl}/create-order`, {
        name, 
        mobile, 
        amount,
      });

      if (response.data.checkoutPageUrl) {
        window.location.href = response.data.checkoutPageUrl;
      } else {
        setError("Invalid response from server.");
      }
    } catch (error) {
      console.error(" Error creating order:", error);
      setError("Payment initiation failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-blue-500 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Pay with PhonePe</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={createOrder} className="flex flex-col gap-4">
        <input
          className="border bg-white rounded-lg p-2 border-indigo-300"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          required
        />

        <input
          className="border bg-white rounded-lg p-2 border-indigo-300"
          type="tel"
          name="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Enter mobile"
          pattern="[0-9]{10}"
          required
        />

        <input
          id="amount"
          type="number"
          placeholder="Enter amount in Rs"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="border bg-white rounded-lg p-2 border-indigo-300"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black hover:bg-blue-600 text-black font-semibold py-2 rounded-md transition duration-200"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
}

export default Form;
