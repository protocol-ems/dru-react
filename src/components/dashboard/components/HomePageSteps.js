import React, { useState } from "react";

export default function HomePageSteps() {
  const [currentStep, setCurrentStep] = useState(1);

  const stepData = [
    {
      id: 1,
      title: "Step 1: Create Labels",
      body: "Labels are the subcategories for medicines, procedures, and protocols. Medicines, procedures, and protocols all have their own labels and can be customized to meet your agency’s needs. Labels only need to be created one time and then they will be optional when creating a medicine, procedure, or protocol. Labels can be sorted by position, this allows the documentation to appear in an organized way that team members can easily understand.",
      example:
        "In the example gif you can see how a medicine label named 'Actions' is created and set to position 1. Along with that, it shows other custom labels that have been created.",
      picture:
        "https://ourprotocol-server-1.s3.us-west-2.amazonaws.com/OurProtocol-Images/Homepage/create-label.gif",
    },
    {
      id: 2,
      title: "Step 2: Add Details",
      body: "Details are information you write into each label. Each detail you add is a bulletin point on the documentation. These can be multi-line and can be as long in text as you need. You can also have as many bulletin points as you need. ",
      example:
        "In the example gif you can see someone adding pediatric deteails and some key point details. Also, as the user scrolls down the page you can see other information taht was enterd. ",
      picture:
        "https://ourprotocol-server-1.s3.us-west-2.amazonaws.com/OurProtocol-Images/Homepage/create-details.gif",
    },
    {
      id: 3,
      title: "Step 3: Add A Table",
      body: "Adding a table is similar to how you might generate a table in other programs. The table is not a requirement but it can be helpful to create more detailed information for your team. ",
      example:
        "In the example gif you can see a dextrose pediatric mixing ratio.",
      picture:
        "https://ourprotocol-server-1.s3.us-west-2.amazonaws.com/OurProtocol-Images/Homepage/create-table.gif",
    },
    {
      id: 4,
      title: "Step 4: Add A Flow Chart ",
      body: "The flow chart creator is an optional tool you can add when creating a new medicine, procedure, or protocol documentation. The tool allows you to create custom flow charts for your team to understand the workflow of any given topic. This powerful tool is intuitive and simple to use.The flow charts are viewable on mobile and feel navigating them is intuitive.",
      example:
        "In the example gif you can see the user creating a very simple flow chart. The first node says 'add dextrose' and the second yellow node says 'observe' and the two are connected with a moving line. This is not intended to be a real world example, but simply highlights how easy it is to create a flow chart.",
      picture:
        "https://ourprotocol-server-1.s3.us-west-2.amazonaws.com/OurProtocol-Images/Homepage/create-flowchart.gif",
    },
    {
      id: 5,
      title: "Step 5: Done!",
      body: "Once the document is completed, it is available to all allowed users. That means any new documentation or any edits are updated when you save the changes. This 5 step process is all that is needed to create a single medicine, procedure, or protocol guideline. In fact, labels can be ignored once you have them setup; simply add details, add a table, and add a flowchart to create detailed documentation for your team. ",
      example:
        "In the example gif you can see the finished medicine guidelines for dextrose that was created in the previous steps. The details, table, and flow chart are all present.",
      picture:
        "https://ourprotocol-server-1.s3.us-west-2.amazonaws.com/OurProtocol-Images/Homepage/complete.gif",
    },
  ];

  return (
    <div className=" bg-gray-50 pt-36 min-h-screen">
      <div className="container mx-auto">
        <div>
          <ul className="w-full steps">
            <li
              className="step step-accent cursor-pointer "
              onClick={() => setCurrentStep(1)}
            >
              Create Labels
            </li>
            <li
              className={
                currentStep > 1
                  ? "step step-accent cursor-pointer"
                  : "step cursor-pointer"
              }
              onClick={() => setCurrentStep(2)}
            >
              Add Details
            </li>
            <li
              className={
                currentStep > 2
                  ? "step step-accent cursor-pointer"
                  : "step cursor-pointer"
              }
              onClick={() => setCurrentStep(3)}
            >
              Add A Table
            </li>
            <li
              className={
                currentStep > 3
                  ? "step step-accent cursor-pointer"
                  : "step cursor-pointer"
              }
              onClick={() => setCurrentStep(4)}
            >
              Create A Flow Chart
            </li>
            <li
              className={
                currentStep > 4
                  ? "step step-accent cursor-pointer"
                  : "step cursor-pointer"
              }
              onClick={() => setCurrentStep(5)}
            >
              Complete
            </li>
          </ul>

          <div className="flex flex-col md:flex-row border rounded shadow-xl mt-12 justify-between items-start  bg-white md:p-4">
            <div className=" md:w-1/2  pt-12">
              <img
                src={stepData[currentStep - 1].picture}
                alt={stepData[currentStep - 1].title}
              />
            </div>
            <div className="flex flex-col md:w-1/2 pt-12">
              <h2 className="text-3xl bold p-2">
                {stepData[currentStep - 1].title}
              </h2>
              <p className="p-4 text-gray-700">
                {stepData[currentStep - 1].body}
              </p>
              <h2 className="text-3xl bold p-2">Picture info</h2>
              <p className="text-gray-600 p-4">
                {stepData[currentStep - 1].example}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
