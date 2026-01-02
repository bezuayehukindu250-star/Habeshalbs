import { createElement, useState, useEffect, useCallback, useMemo } from 'https://esm.sh/react@18.2.0';
import { createRoot } from 'https://esm.sh/react-dom@18.2.0/client';
import htm from 'https://esm.sh/htm@3.1.1';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation, Navigate } from 'https://esm.sh/react-router-dom@6.11.2';
import * as LucideReact from 'https://esm.sh/lucide-react@0.263.1';

const html = htm.bind(createElement);

export { 
    createElement, useState, useEffect, useCallback, useMemo, 
    createRoot, html, 
    HashRouter, Routes, Route, Link, useNavigate, useLocation, Navigate,
    LucideReact 
};