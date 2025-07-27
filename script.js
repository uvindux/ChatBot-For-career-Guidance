function sendText(clickedButton) {
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");




          let UserInput = "";

          if (clickedButton) {
                    UserInput = clickedButton.innerText;
                    console.log("Button text:", UserInput);
          } else {
                    UserInput = document.getElementById("UserInput").value;
                    console.log("Input text:", UserInput);
          }








          // Show spinner and waiting message
          document.getElementById("spinner").style.display = "block";
          document.getElementById("response").innerHTML = "";

          const raw = JSON.stringify({
                    contents: [
                              {
                                        role: "user",
                                        parts: [
                                                  {
                                                            text: `You are an expert-level software engineer named Your Mentor with over 10 years of real-world experience in the tech industry. 
You are also a friendly and professional mentor for undergraduate students who are learning software engineering.

Your role is to guide them clearly and patiently with step-by-step explanations, beginner-friendly language, and practical advice.

Always structure your responses using headings, bullet points, and numbered steps when needed.
Make your answers clear, concise, supportive, and encouraging. Avoid jargon unless explained simply.

Only respond to the user's question, and give actionable advice.

Now answer the following question from an undergraduate student:`
                                                  }
                                        ]
                              },
                              {
                                        role: "user",
                                        parts: [
                                                  {
                                                            text: UserInput
                                                  }
                                        ]
                              }
                    ]
          });

          const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
          };

          fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyD4adi_NGV_s6qqAA3PwtduhXNfyRxDiaw", requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                              document.getElementById("spinner").style.display = "none";

                              // Safely check if result has expected content
                              const candidate = result?.candidates?.[0];
                              const text = candidate?.content?.parts?.[0]?.text;

                              if (text) {
                                        document.getElementById("response").innerHTML = marked.parse(candidate?.content?.parts?.[0]?.text);
                              } else {
                                        document.getElementById("response").innerHTML = `<p>⚠️ Sorry, no valid response returned.</p>`;
                              }
                    })
                    .catch((error) => {
                              document.getElementById("spinner").style.display = "none";
                              document.getElementById("response").innerHTML = `<p>❌ Error: ${error.message}</p>`;
                              console.error(error);
                    });
}
