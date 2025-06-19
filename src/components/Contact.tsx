
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Github, Linkedin } from "lucide-react";

export const Contact = () => {
  return (
    <section className="py-20 px-6 lg:px-20 bg-gray-800/20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              Let's Work Together
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="First Name"
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500"
              />
              <Input
                placeholder="Last Name"
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500"
              />
            </div>
            
            <Input
              type="email"
              placeholder="Email Address"
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500"
            />
            
            <Input
              placeholder="Subject"
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500"
            />
            
            <textarea
              placeholder="Your Message"
              rows={6}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-md text-white placeholder:text-gray-400 focus:border-blue-500 focus:outline-none resize-none"
            />
            
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3">
              Send Message
            </Button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-6 text-white">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white font-medium">hello@developer.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">GitHub</p>
                    <p className="text-white font-medium">@developer</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">LinkedIn</p>
                    <p className="text-white font-medium">in/developer</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-400 mb-4">Prefer to email directly?</p>
              <Button
                variant="outline"
                className="border-gray-600 text-white hover:bg-gray-800"
              >
                <Mail className="w-4 h-4 mr-2" />
                hello@developer.com
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
