"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [joined, setJoined] = useState(false);
  if (joined) return <div className="newsletter newsletter-thanks" role="status"><p className="footer-heading">Notes from the Studio</p><p>Thank you. Newsletter delivery is coming soon, and your address was not saved.</p><button type="button" onClick={() => setJoined(false)}>Return</button></div>;
  return <form className="newsletter" onSubmit={(event) => { event.preventDefault(); if (event.currentTarget.reportValidity()) setJoined(true); }}>
    <p className="footer-heading">Notes from the Studio</p>
    <p>Seasonal inspiration, new arrivals, and a considered approach to home.</p>
    <label><span className="sr-only">Email address</span><input required type="email" name="email" placeholder="Email address" autoComplete="email" /><button type="submit" aria-label="Join newsletter">→</button></label>
  </form>;
}
