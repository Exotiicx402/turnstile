import { motion } from 'framer-motion';
import { CheckCircle, Rocket, LineChart, Coins, Users, Lock } from 'lucide-react';

// Modify milestones here
const roadmapData = [
  {
    quarter: 'Q4 2025',
    icon: Coins,
    milestones: [
      'Website launch',
      'Token launch (pump.fun)',
      'Public waitlist opens',
      'SDK alpha release',
      'x402 protocol integration',
    ],
  },
  {
    quarter: 'Q1 2026',
    icon: Rocket,
    milestones: [
      'Closed beta program',
      'Litepaper published',
      'Dashboard v1 launch',
      'First 50 API providers',
      'Agent builder toolkit',
    ],
  },
  {
    quarter: 'Q2 2026',
    icon: Users,
    milestones: [
      'Public marketplace opens',
      'Mainnet deployment',
      '$TSTL rewards program',
      'Provider onboarding at scale',
      '1000+ active agents',
    ],
  },
  {
    quarter: 'Q3 2026',
    icon: LineChart,
    milestones: [
      'Staking mechanism live',
      'Governance voting enabled',
      'Advanced analytics dashboard',
      'Multi-chain expansion research',
      'Enterprise tier launch',
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function RoadmapSection() {
  return (
    <section className="bg-gradient-to-br from-[#1a1d18] via-black to-[#2a2e26] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extralight text-[#f8f7f5] mb-4">
            Roadmap
          </h2>
          <p className="text-lg md:text-xl text-[#c8b4a0] font-light">
            Building the future of x402 payments, one quarter at a time.
          </p>
        </div>

        {/* Roadmap Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {roadmapData.map((quarter, index) => {
            const Icon = quarter.icon;
            
            // Gradient colors for each quarter
            const gradients = [
              'from-emerald-500/10 to-teal-500/10',
              'from-teal-500/10 to-cyan-500/10',
              'from-cyan-500/10 to-fuchsia-500/10',
              'from-fuchsia-500/10 to-pink-500/10',
            ];
            
            const borderGradients = [
              'from-emerald-500/30 via-teal-500/20 to-transparent',
              'from-teal-500/30 via-cyan-500/20 to-transparent',
              'from-cyan-500/30 via-fuchsia-500/20 to-transparent',
              'from-fuchsia-500/30 via-pink-500/20 to-transparent',
            ];

            return (
              <motion.div
                key={quarter.quarter}
                variants={itemVariants}
                className="group relative"
              >
                {/* Card */}
                <div
                  className={`relative h-full bg-gradient-to-br ${gradients[index]} backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-[#c8b4a0]/5`}
                >
                  {/* Quarter Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#c8b4a0]/10 rounded-lg">
                      <Icon className="w-5 h-5 text-[#c8b4a0]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#f8f7f5]">
                      {quarter.quarter}
                    </h3>
                  </div>

                  {/* Gradient Divider */}
                  <div
                    className={`h-px w-full bg-gradient-to-r ${borderGradients[index]} mb-6`}
                  />

                  {/* Milestones */}
                  <ul className="space-y-3">
                    {quarter.milestones.map((milestone, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-[#c8b4a0] group-hover:text-[#f8f7f5] transition-colors"
                      >
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#c8b4a0] group-hover:text-emerald-400 transition-colors" />
                        <span className="text-sm leading-relaxed">
                          {milestone}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom Glow Effect */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r ${borderGradients[index]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                </div>

                {/* Connecting Line (desktop only, except last item) */}
                {index < roadmapData.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-[#c8b4a0]/30 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-[#c8b4a0] mb-6">
            Ready to build on Turnstile? Explore our technical documentation.
          </p>
          <a href="/docs">
            <button className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20">
              View Docs
            </button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
