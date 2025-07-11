// test.js
// Comprehensive API test script for Subscription Tracker with a fresh, unique user each run

const apiBase = "http://localhost:5500/api/v1";
const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/115.0";

const timestamp = Date.now();
const testUser = {
  name: `AutoTester${timestamp}`,
  email: `autotest${timestamp}@example.com`,
  password: "TestPassword!123"
};

const sampleSubscription = {
  name: "Spotify",
  price: 9.99,
  currency: "USD",
  frequency: "monthly",
  category: "music",
  paymentMethod: "credit card",
  startDate: new Date().toISOString().slice(0, 10)
};

function section(title) {
  console.log("\n====================");
  console.log(title);
  console.log("====================");
}

// Helper to parse JSON safely
async function safeJson(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { error: text };
  }
}

// Sign Up
async function signUp(user) {
  section("Sign Up");
  const response = await fetch(`${apiBase}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": userAgent
    },
    body: JSON.stringify(user)
  });
  const json = await safeJson(response);
  console.log(json);
  return json;
}

// Sign In
async function signIn(user) {
  section("Sign In");
  const response = await fetch(`${apiBase}/auth/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": userAgent
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password
    })
  });
  const json = await safeJson(response);
  console.log(json);
  return json;
}

// Create Subscription
async function createSubscription(token, subscription) {
  section("Create Subscription");
  const response = await fetch(`${apiBase}/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "User-Agent": userAgent
    },
    body: JSON.stringify(subscription)
  });
  const json = await safeJson(response);
  console.log(json);
  return json;
}

// Get All Subscriptions
async function getSubscriptions(token) {
  section("Get Subscriptions");
  const response = await fetch(`${apiBase}/subscriptions`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "User-Agent": userAgent
    }
  });
  const json = await safeJson(response);
  console.log(json);
  return json;
}

// Update Subscription
async function updateSubscription(token, subId) {
  section("Update Subscription");
  const response = await fetch(`${apiBase}/subscriptions/${subId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "User-Agent": userAgent
    },
    body: JSON.stringify({
      price: 12.99,
      category: "premium music"
    })
  });
  const json = await safeJson(response);
  console.log(json);
  return json;
}

// Delete Subscription
async function deleteSubscription(token, subId) {
  section("Delete Subscription");
  const response = await fetch(`${apiBase}/subscriptions/${subId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "User-Agent": userAgent
    }
  });
  const json = await safeJson(response);
  console.log(json);
  return json;
}

// Test Unauthorized Request
async function testUnauthorized() {
  section("Unauthorized Request Test");
  const response = await fetch(`${apiBase}/subscriptions`, {
    method: "GET",
    headers: {
      "User-Agent": userAgent
    }
  });
  const json = await safeJson(response);
  console.log(json);
  return json;
}

// Main sequence
async function main() {
  // 1. Sign Up
  const signUpRes = await signUp(testUser);
  if (!signUpRes.success) {
    console.error("Sign up failed — cannot continue.");
    process.exit(1);
  }

  // 2. Sign In
  const signInRes = await signIn(testUser);
  if (!signInRes.success || !signInRes.data || !signInRes.data.token) {
    console.error("Sign in failed — cannot continue.");
    process.exit(1);
  }
  const token = signInRes.data.token;

  // 3. Create Subscription
  const subRes = await createSubscription(token, sampleSubscription);
  if (!subRes.success || !subRes.data || !subRes.data.subscription) {
    console.error("Create subscription failed — cannot continue.");
    process.exit(1);
  }
  const subId = subRes.data.subscription._id;

  // 4. Get All Subscriptions
  await getSubscriptions(token);

  // 5. Update Subscription
  await updateSubscription(token, subId);

  // 6. Get All Subscriptions Again (see update)
  await getSubscriptions(token);

  // 7. Delete Subscription
  await deleteSubscription(token, subId);

  // 8. Get All Subscriptions Again (should be empty)
  await getSubscriptions(token);

  // 9. Attempt to get subscriptions without auth token
  await testUnauthorized();

  section("All tests complete!");
}

main().catch((err) => {
  console.error("Top-level error:", err);
});


//to run locally npx @upstash/qstash-cli dev  for qstash local server at port 8080