import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-gray-900 dark:bg-gray-950 text-white py-16'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row justify-between gap-8'>
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}>
            <h3 className='text-xl font-bold mb-6'>Contact Information</h3>
            <div className='space-y-4'>
              <div className='flex items-center space-x-3'>
                <Mail className='w-5 h-5 text-[#0175C2]' />
                <span>geo.abdelrahmanem@gmail.com</span>
              </div>
              <div className='flex items-center space-x-3'>
                <Phone className='w-5 h-5 text-[#0175C2]' />
                <span>+201115275161</span>
              </div>
              <div className='flex items-center space-x-3'>
                <MapPin className='w-5 h-5 text-[#0175C2]' />
                <span>Aswan, Egypt</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}>
            <h3 className='text-xl font-bold mb-6'>Quick Links</h3>
            <div className='space-y-2'>
              {[
                {
                  name: 'Home',
                  href: '/',
                },
                {
                  name: 'Course Overview',
                  href: '#overview',
                },
                {
                  name: 'Instructor',
                  href: '#instructor',
                },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className='block text-gray-400 hover:text-[#0175C2] transition-colors'>
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* dart Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}>
            <h3 className='text-xl font-bold mb-6'>dart Links</h3>
            <div className='space-y-2'>
              {[
                {
                  name: 'Day 1',
                  href: '/day1',
                },
                {
                  name: 'Day 2',
                  href: '/day2',
                },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className='block text-gray-400 hover:text-[#0175C2] transition-colors'>
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* flutter Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}>
            <h3 className='text-xl font-bold mb-6'>Flutter Links</h3>
            <div className='space-y-2'>
              {[
                {
                  name: 'Day 3',
                  href: '/day3',
                },
                {
                  name: 'day4',
                  href: '/day4',
                },
                {
                  name: 'day5',
                  href: '/day5',
                },
                {
                  name: 'day6',
                  href: '/day6',
                },
                {
                  name: 'day7',
                  href: '/day7',
                },
                {
                  name: 'day8',
                  href: '/day8',
                },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className='block text-gray-400 hover:text-[#0175C2] transition-colors'>
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>

          {/* flutter Links */}
          {/* <motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: 0.1 }}>
						<h3 className='text-xl font-bold mb-6'>firebase Links</h3>
						<div className='space-y-2'>
							{[
								{
									name: 'day9',
									href: '/day9',
								},
								{
									name: 'day10',
									href: '/day10',
								},
							].map((link) => (
								<a
									key={link.name}
									href={link.href}
									className='block text-gray-400 hover:text-[#0175C2] transition-colors'>
									{link.name}
								</a>
							))}
						</div>
					</motion.div> */}
        </div>

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}>
          <h3 className='text-xl font-bold mb-6'>About This Course</h3>
          <p className='text-gray-400 leading-relaxed'>
            A comprehensive 8-day intensive course designed to take you from
            Flutter beginner to confident practitioner with hands-on experience
            and real-world projects.
          </p>
        </motion.div>

        <div className='border-t border-gray-800 mt-12 pt-8 text-center'>
          <p className='text-gray-400'>
            © 2025 Flutter in 8 Days by Abdelrahman Hossam. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
