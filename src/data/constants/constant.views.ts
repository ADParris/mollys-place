import React from 'react';

import { IconType } from 'react-icons';
import { BiGame } from 'react-icons/bi';
import { GoNote } from 'react-icons/go';
import { MdChildCare } from 'react-icons/md';
import { RiHomeHeartLine } from 'react-icons/ri';
import { SiAboutDotMe } from 'react-icons/si';

import {
	AboutView,
	GamingView,
	HomeView,
	KidsView,
	RecipeView,
	SignInView,
} from 'views';

interface IBaseView extends IRoute {}

const baseViews: IBaseView[] = [
	{ Component: AboutView, icon: SiAboutDotMe, id: `about` },
	{ Component: RecipeView, icon: GoNote, id: `recipes` },
	{ Component: GamingView, icon: BiGame, id: `gaming` },
	{ Component: KidsView, icon: MdChildCare, id: `kids` },
	{ Component: SignInView, id: `signIn` },
	{ Component: HomeView, icon: RiHomeHeartLine, id: `home` },
];

export interface IViewProps {
	id: string;
}

export interface IRoute extends IViewsMenuItem {
	Component: React.FC<IViewProps>;
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
