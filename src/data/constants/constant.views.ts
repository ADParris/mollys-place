import React from 'react';

import { IconType } from 'react-icons';
import { BiGame } from 'react-icons/bi';
import { GoNote } from 'react-icons/go';
import { MdChildCare } from 'react-icons/md';
import { RiHomeHeartLine } from 'react-icons/ri';
import { SiAboutDotMe } from 'react-icons/si';

import { IBanner } from 'data/models';

import {
	AboutView,
	GamingView,
	HomeView,
	KidsView,
	RecipeView,
	SignInView,
} from 'views';

interface IBaseView {
	Component: React.FC<IViewProps>;
	id: string;
	icon?: IconType;
}

const baseViews: IBaseView[] = [
	{ Component: AboutView, icon: SiAboutDotMe, id: `about` },
	{ Component: RecipeView, icon: GoNote, id: `recipes` },
	{ Component: GamingView, icon: BiGame, id: `gaming` },
	{
		Component: KidsView,
		icon: MdChildCare,
		id: `kids`,
	},
	{ Component: SignInView, id: `signIn` },
	{ Component: HomeView, icon: RiHomeHeartLine, id: `home` },
];

export interface IViewProps {
	banner: IBanner;
	id: string;
}

export interface IRoute {
	Component: React.FC<IViewProps>;
	id: string;
}

export const routes = baseViews.map(view => ({
	Component: view.Component,
	id: view.id,
})) as IRoute[];

export interface IViewsMenuItem {
	icon?: IconType;
	id: string;
}

export const viewsMenu = baseViews
	.filter(view => view.id !== `signIn`)
	.map(view => ({
		icon: view.icon,
		id: view.id,
	}))
	.reverse() as IViewsMenuItem[];
