class StaticPagesController < ApplicationController
	def account
	end

	def cart
	end

	def index
	end

	def choose
		if (defined? params[:choose_color]) && (!params[:choose_color].nil?)
			session[:color_choice] = params[:choose_color]
			redirect_to measure_url
		end
	end

	def measure
	end

	def order
	end

	def install
	end

end