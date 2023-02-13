/* VARIABLES */
var page_start = true;
const header = document.getElementsByClassName("header")[0];
const logo = document.getElementsByClassName("logo")[0];
const logoLink = document.getElementsByTagName("a")[0];

const nav = document.getElementsByClassName("navigation");
const navLinks = nav[0].querySelectorAll("ul a");

const styleSheet = document.styleSheets[0];

const containerTitle_selector = '.container-title::after';
const containerTitle_idx = Array.from(styleSheet.cssRules).findIndex(rule => rule.selectorText === containerTitle_selector);

const cardBorder_selector = '.card';
const cardBorder_idx = Array.from(styleSheet.cssRules).findIndex(rule => rule.selectorText === cardBorder_selector);

const navIndicator = document.querySelector(".indicator");

const sections = document.querySelectorAll('section');
const windowHeight = window.innerHeight;
/* VARIABLES END */


// SCROLLING ANIMATION
const observer = new IntersectionObserver((entries) =>
{
	entries.forEach((entry) =>
	{
		if (entry.isIntersecting)
		{
			entry.target.classList.add("show");
		}
		else
		{
			entry.target.classList.remove("show");
		}
	});
});

const hidden_elements = document.querySelectorAll(".hidden");
hidden_elements.forEach((element) => observer.observe(element));
// ─────────────────────────────────────────────────────────────────────────────


// CHANGE ELEMENT COLOR BASED ON EVENT
function color_change()
{
	refresh();

	window.addEventListener('scroll', () => 
	{
		if (window.scrollY <= 180)
		{
			page_start = true;
			header.style.setProperty('transition', 'background-color 0.3s ease');
			header.style.backgroundColor = "transparent";

			updateColors();
		}
		else
		{
			page_start = false;
			header.style.setProperty('transition', 'background-color 0.3s ease');
			header.style.backgroundColor = "var(--light-blue-color)";

			updateColors();
		}
	});

	function refresh()
	{
		logo.addEventListener("mouseover", updateColors);
		logo.addEventListener("mouseout", updateColors);

		for (const nav of navLinks)
		{
			nav.addEventListener("mouseover", updateColors);
			nav.addEventListener("mouseout", updateColors);
		}
	}

	function updateColors()
	{
		if (page_start)
		{
			header.style.setProperty('transition', 'background-color 0.5s ease');
			header.style.backgroundColor = "rgba(255, 255, 255, 0.1)";

			logoLink.style.color = "var(--white-color)";

			for (const nav of navLinks)
			{
				nav.style.setProperty('transition', '0.2s ease');
				nav.style.color = "var(--yellow-color)";
				nav.style.backgroundColor = "transparent";

				if (nav.matches(":hover"))
				{
					nav.style.backgroundColor = "var(--white-color)";
					nav.style.color = "var(--blue-color)";
				}
			}
			if (logo.matches(":hover"))
			{
				logoLink.style.color = "var(--light-blue-color)";
			}

		}
		else
		{
			header.style.setProperty('transition', 'background-color 2s ease');
			header.style.backgroundColor = "var(--light-blue-color)";

			logoLink.style.color = "var(--black-color)";

			styleSheet.cssRules[containerTitle_idx].style.backgroundColor = 'aqua';

			styleSheet.cssRules[cardBorder_idx].style.setProperty('border', '3px solid aqua');

			const updateNavIndicator = (target) =>
			{
				if (navIndicator.style.left == `${target.offsetLeft}px`)
				{
					navIndicator.style.backgroundColor = 'white';
				}
				else
				{
					navIndicator.style.backgroundColor = 'black';
				}
			};

			for (const nav of navLinks)
			{
				nav.addEventListener("mouseover", () =>
				{
					updateNavIndicator(nav);
					clickedLink = null;
				});
				nav.addEventListener("mouseout", () =>
				{
					navIndicator.style.backgroundColor = 'black';
					clickedLink = null;
				});
				nav.addEventListener("click", () => updateNavIndicator(nav));
			}

			for (const nav of navLinks)
			{
				nav.style.setProperty('transition', '0.2s ease');

				nav.style.color = "var(--black-color)";

				nav.style.backgroundColor = "transparent";

				if (nav.matches(":hover"))
				{
					nav.style.backgroundColor = "var(--black-color)";
					nav.style.color = "var(--white-color)";
					nav.style.setProperty('transition', 'background-color 0.4s ease, color 0.4s ease');
				}
			}

			if (logo.matches(":hover"))
			{
				logoLink.style.color = "white";
				header.style.backgroundColor = "black";
				header.style.setProperty('transition', 'background-color 2s ease');

				navIndicator.style.backgroundColor = 'white';

				for (const nav of navLinks)
				{
					nav.style.setProperty('transition', '2s ease');
					nav.style.color = 'yellow';
				}

				styleSheet.cssRules[containerTitle_idx].style.setProperty('transition', 'background-color 2s ease');
				styleSheet.cssRules[containerTitle_idx].style.backgroundColor = 'yellow';

				styleSheet.cssRules[cardBorder_idx].style.setProperty('transition', 'border-color 2s ease');
				styleSheet.cssRules[cardBorder_idx].style.setProperty('border', '3px solid yellow');
			}
			logo.addEventListener("mouseout", () => (navIndicator.style.backgroundColor = 'black'));
		}
	}
}
color_change();
// ─────────────────────────────────────────────────────────────────────────────


// TYPING TEXT 
var type = new Typed(".changing_text", {
	strings: [
		"Front End Developer",
		"Software Developer",
		"Android Developer",
		"Computer Science Passionate",
	],
	startDelay: 1000,
	typeSpeed: 75,
	backSpeed: 20,
	backDelay: 1400,
	loop: true,
	cursorChar: "_",
});
// ─────────────────────────────────────────────────────────────────────────────


/* NAVIGATION INDICATOR */
let clickedLink = null;

function nav_indicate()
{
	navLinks.forEach(link =>
	{
		link.addEventListener('click', e =>
		{
			clickedLink = link;
			navIndicator.style.width = `${link.offsetWidth}px`;
			navIndicator.style.left = `${link.offsetLeft}px`;
		});
	});
}

// TODO: NAVIGATION INDICATOR AUTO SCROLL BASED ON SECTION
function navIndicator_windowScroll()
{
	if (window.scrollY < 250)
	{
		navIndicator.style.width = '0';
	}
	else if (clickedLink)
	{
		navIndicator.style.width = `${clickedLink.offsetWidth}px`;
	}

	const scrollTop = window.scrollY;
	sections.forEach(function (section, i)
	{
		if (section.offsetTop < scrollTop + windowHeight / 2 && scrollTop < section.offsetTop + windowHeight / 2)
		{
			for (const nav of navLinks)
			{
				if (section.hasAttribute('id') && nav.getAttribute("href") == '#' + section.id)
				{
					if (!clickedLink)
					{
						navIndicator.style.width = `${nav.offsetWidth}px`;
						navIndicator.style.left = `${nav.offsetLeft}px`;

						if (nav.matches(":hover"))
						{
							navIndicator.style.backgroundColor = 'white';
						}
						else
						{
							if(!logo.matches(":hover"))
								navIndicator.style.backgroundColor = 'black';
						}

					}
				}
			}
		}
	});
}
// ─────────────────────────────────────────────────────────────────────────────

nav_indicate();
window.addEventListener('scroll', navIndicator_windowScroll);
/* NAVIGATION INDICATOR END */