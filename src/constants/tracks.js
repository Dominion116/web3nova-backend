// Fixed catalog to match your UI
const TRACKS = [
    { slug: 'rust_protocol',    title: 'Rust Blockchain Protocol Development', level: 'Advanced' },
    { slug: 'backend_adv',      title: 'Backend Development (Web2 Advanced)',  level: 'Advanced' },
    { slug: 'frontend_adv',     title: 'Frontend Development (Web2 Advanced)', level: 'Advanced' },
    { slug: 'web2_launchpad',   title: 'Web2 Launchpad',                       level: 'Beginner'  },
    { slug: 'solidity',         title: 'Solidity (Web3 Development)',          level: 'Intermediate' },
  ];
  
  const DURATIONS = [
    { value: '3_months',  label: '3 Months'  },
    { value: '6_months',  label: '6 Months'  }
  ];
  
  const TRACK_SLUGS = TRACKS.map(t => t.slug);
  const DURATION_VALUES = DURATIONS.map(d => d.value);
  
  module.exports = {
    TRACKS,
    TRACK_SLUGS,
    DURATIONS,
    DURATION_VALUES
  };
  