
const exams = [
  {
    name: "UPSC Civil Services Examination",
    category: "UPSC",
    department: "Union Public Service Commission",
    qualification: "Graduate",
    state: "Central",
    deadline: "Verify official notification",
    officialUrl: "https://upsc.gov.in/"
  },
  {
    name: "SSC Combined Graduate Level",
    category: "SSC",
    department: "Staff Selection Commission",
    qualification: "Graduate",
    state: "Central",
    deadline: "Verify official notification",
    officialUrl: "https://ssc.gov.in/"
  },
  {
    name: "SSC Combined Higher Secondary Level",
    category: "SSC",
    department: "Staff Selection Commission",
    qualification: "12th Pass",
    state: "Central",
    deadline: "Verify official notification",
    officialUrl: "https://ssc.gov.in/"
  },
  {
    name: "RRB Railway Recruitment",
    category: "Railways",
    department: "Railway Recruitment Boards",
    qualification: "10th Pass",
    state: "Central",
    deadline: "Check the relevant RRB notice",
    officialUrl: "https://www.rrbcdg.gov.in/"
  },
  {
    name: "IBPS Banking Examinations",
    category: "Banking",
    department: "Institute of Banking Personnel Selection",
    qualification: "Graduate",
    state: "Central",
    deadline: "Check the official exam calendar",
    officialUrl: "https://www.ibps.in/"
  },
  {
    name: "SBI Recruitment Examinations",
    category: "Banking",
    department: "State Bank of India",
    qualification: "Graduate",
    state: "Central",
    deadline: "Verify official notification",
    officialUrl: "https://sbi.co.in/web/careers"
  },
  {
    name: "UPSC NDA Examination",
    category: "Defence",
    department: "Union Public Service Commission",
    qualification: "12th Pass",
    state: "Central",
    deadline: "Verify official notification",
    officialUrl: "https://upsc.gov.in/"
  },
  {
    name: "KPSC Recruitment",
    category: "State PSC",
    department: "Karnataka Public Service Commission",
    qualification: "Graduate",
    state: "Karnataka",
    deadline: "Check the relevant recruitment notice",
    officialUrl: "https://kpsc.kar.nic.in/"
  },
  {
    name: "TNPSC Recruitment",
    category: "State PSC",
    department: "Tamil Nadu Public Service Commission",
    qualification: "Graduate",
    state: "Tamil Nadu",
    deadline: "Check the relevant recruitment notice",
    officialUrl: "https://www.tnpsc.gov.in/"
  },
  {
    name: "CTET Examination",
    category: "Teaching",
    department: "Central Board of Secondary Education",
    qualification: "Graduate",
    state: "Central",
    deadline: "Verify official notification",
    officialUrl: "https://ctet.nic.in/"
  }
];

const examList = document.getElementById("examList");
const searchInput = document.getElementById("searchInput");
const qualificationFilter =
  document.getElementById("qualificationFilter");
const stateFilter = document.getElementById("stateFilter");
const resultCount = document.getElementById("resultCount");

let selectedCategory = "All";

function renderExams() {
  const query = searchInput.value.trim().toLowerCase();
  const qualification = qualificationFilter.value;
  const state = stateFilter.value;

  const filteredExams = exams.filter(exam => {
    const searchableText = [
      exam.name,
      exam.category,
      exam.department,
      exam.state,
      exam.qualification
    ].join(" ").toLowerCase();

    const matchesSearch = searchableText.includes(query);
    const matchesCategory =
      selectedCategory === "All" ||
      exam.category === selectedCategory;
    const matchesQualification =
      qualification === "All" ||
      exam.qualification === qualification;
    const matchesState =
      state === "All" || exam.state === state;

    return matchesSearch &&
      matchesCategory &&
      matchesQualification &&
      matchesState;
  });

  resultCount.textContent =
    `${filteredExams.length} exams found`;

  if (filteredExams.length === 0) {
    examList.innerHTML = `
      <div class="empty-state">
        <h3>No matching exams found</h3>
        <p>Try another keyword or reset your filters.</p>
      </div>`;
    return;
  }

  examList.innerHTML = filteredExams.map(exam => `
    <article class="exam-card">
      <span class="exam-tag">${exam.category}</span>
      <h3>${exam.name}</h3>
      <p><strong>Department:</strong> ${exam.department}</p>
      <p><strong>Qualification:</strong> ${exam.qualification}</p>
      <p><strong>Region:</strong> ${exam.state}</p>
      <p class="deadline">
        ${exam.deadline}
      </p>
      <a class="exam-link"
         href="${exam.officialUrl}"
         target="_blank"
         rel="noopener noreferrer">
        Visit Official Website ↗
      </a>
    </article>
  `).join("");
}

searchInput.addEventListener("input", renderExams);
document.getElementById("searchBtn")
  .addEventListener("click", renderExams);
qualificationFilter.addEventListener("change", renderExams);
stateFilter.addEventListener("change", renderExams);

document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;

    document.querySelectorAll(".category").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    renderExams();
  });
});

document.getElementById("resetBtn").addEventListener("click", () => {
  searchInput.value = "";
  qualificationFilter.value = "All";
  stateFilter.value = "All";
  selectedCategory = "All";

  document.querySelectorAll(".category").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.category === "All"
    );
  });

  renderExams();
});

renderExams();
