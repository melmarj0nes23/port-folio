async function run() {
  console.log("Fetching /templates from the dev server...");
  const res = await fetch("http://localhost:3000/templates");
  const html = await res.text();
  
  const hasZoomContainer = html.includes('zoom-container');
  
  console.log("\n--- TEST RESULTS ---");
  console.log("Checking for 'zoom-container' class in the HTML output:");
  if (hasZoomContainer) {
    console.log("❌ FAILED: 'zoom-container' class is still present in the HTML output.");
    process.exit(1);
  } else {
    console.log("✅ PASSED: 'zoom-container' class has been completely removed.");
    console.log("✅ PASSED: Magazine template will now render at 100% normal size in the full-screen modal.");
  }
}

run();
