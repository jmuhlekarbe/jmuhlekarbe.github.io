---
layout: base.njk
---

<div class="intro">
<div class="intro-text">

# Johannes Muhle-Karbe

I am the Head of the [Mathematical Finance Section](https://www.imperial.ac.uk/mathematical-finance/) in the [Department of Mathematics](https://www.imperial.ac.uk/mathematics) at [Imperial College London](https://www.imperial.ac.uk/). My research focuses on Stochastic Optimization, Applied Probability and Applications in Finance.

I also co-lead the college-wide [Imperial Centre of Excellence in Quantitative Finance](https://www.imperial.ac.uk/quantitative-finance-centre/), and I am the Director of the [CFM-Imperial Institute of Quantitative Finance](https://www.imperial.ac.uk/quantitative-finance/).

Before joining Imperial College, I held faculty positions at [Carnegie Mellon University](https://www.cmu.edu/), the [University of Michigan](https://umich.edu/), and [ETH Zürich](https://www.ethz.ch/).

</div>

<!-- PHOTO: replace src/images/profile.jpg with a square photo (at least 800 x 800 px) -->
<img class="portrait" src="/images/profile.jpg" alt="Portrait of Johannes Muhle-Karbe" width="220" height="220">
</div>

<!-- TO UPDATE THE CV: upload the new PDF to src/files/ with the same name, cv-muhle-karbe.pdf -->
<p class="cv-link"><a href="/files/cv-muhle-karbe.pdf">Detailed CV</a> (PDF)</p>

## Contact

<p class="contact">Email: <a href="mailto:{{ site.email }}">{{ site.email }}</a></p>

<p class="link-row">
  {%- for p in site.profiles %}<a href="{{ p.url }}">{{ p.name }}</a>{% endfor -%}
</p>
