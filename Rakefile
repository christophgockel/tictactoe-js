require 'jasmine'
require 'uglifier'

ENV['JASMINE_CONFIG_PATH']="./jasmine.yml"
load 'jasmine/tasks/jasmine.rake'

task :build => :clean do
  all_content = ""

  Dir.mkdir("dist")

  Dir["src/**/*.js"].sort.each do |file|
    puts "Adding source: #{file}"
    all_content += File.read(file)
  end

  File.open("dist/tictactoe.js", "w") do |file|
    puts "Writing file: #{file.path}"
    file.write(all_content)
  end

  File.open("dist/tictactoe.min.js", "w") do |file|
    puts "Writing file: #{file.path}"
    file.write(Uglifier.new.compile(File.read("dist/tictactoe.js")))
  end

  puts "Build finished."
end

task :clean do
  FileUtils.rm_rf("dist")
end
